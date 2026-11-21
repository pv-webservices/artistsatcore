<?php
/**
 * Enquiry form handler for Artists at Core Films.
 * Accepts JSON POST from /contact-us/, validates input, rate-limits by IP and sends an email.
 * Recipients and sender can be overridden by server env vars (AAC_MAIL_TO, AAC_MAIL_FROM).
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $code, array $payload): void {
    http_response_code($code);
    echo json_encode($payload);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// Same-origin check (blocks cross-site form abuse)
$host = $_SERVER['HTTP_HOST'] ?? '';
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== $host) {
    respond(403, ['ok' => false, 'error' => 'Forbidden']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    $data = $_POST;
}

// Honeypot: bots fill hidden fields. Pretend success.
if (!empty($data['company'])) {
    respond(200, ['ok' => true]);
}

$clean = static function ($v, int $max): string {
    $v = is_string($v) ? trim($v) : '';
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    return mb_substr($v, 0, $max);
};
$oneLine = static fn(string $v): string => str_replace(["\r", "\n"], ' ', $v);

$name    = $oneLine($clean($data['name'] ?? '', 100));
$email   = $oneLine($clean($data['email'] ?? '', 150));
$phone   = $oneLine($clean($data['phone'] ?? '', 20));
$service = $oneLine($clean($data['service'] ?? '', 60));
$message = $clean($data['message'] ?? '', 3000);

$errors = [];
if (mb_strlen($name) < 2) $errors['name'] = 'Please enter your name.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Please enter a valid email address.';
if (!preg_match('/^[0-9+()\-\s]{7,20}$/', $phone)) $errors['phone'] = 'Please enter a valid phone number.';
if (mb_strlen($message) < 10) $errors['message'] = 'Please tell us a little more about the project.';
if ($service !== '' && !preg_match('/^[a-z0-9\-]{2,60}$/', $service)) $service = '';
if ($errors) {
    respond(422, ['ok' => false, 'error' => 'Please check the highlighted fields.', 'fields' => $errors]);
}

// Simple rate limit: max 5 submissions per IP per hour.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/aac_rl_' . hash('sha256', $ip);
$now = time();
$hits = [];
if (is_file($bucket)) {
    $hits = array_filter((array) json_decode((string) file_get_contents($bucket), true), static fn($t) => is_int($t) && $t > $now - 3600);
}
if (count($hits) >= 5) {
    respond(429, ['ok' => false, 'error' => 'Too many requests. Please call or email us directly.']);
}
$hits[] = $now;
@file_put_contents($bucket, json_encode(array_values($hits)), LOCK_EX);

$to   = getenv('AAC_MAIL_TO') ?: 'dheeraj@artistsatcore.com, richa@artistsatcore.com';
$from = getenv('AAC_MAIL_FROM') ?: 'website@artistsatcore.com';

$subject = 'New enquiry: ' . $name . ($service ? " ({$service})" : '');
$body = "New enquiry from artistsatcore.com\n\n"
      . "Name:    {$name}\n"
      . "Email:   {$email}\n"
      . "Phone:   {$phone}\n"
      . 'Service: ' . ($service ?: '-') . "\n\n"
      . "Message:\n{$message}\n\n"
      . '-- Sent ' . gmdate('Y-m-d H:i') . " UTC\n";

$headers = [
    'From: Artists at Core Website <' . $from . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: AAC-Site',
];

$sent = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
if (!$sent) {
    error_log('[aac-contact] mail() failed for enquiry from ' . $email);
    respond(500, ['ok' => false, 'error' => 'Mail could not be sent.']);
}

respond(200, ['ok' => true, 'message' => 'Thanks — your enquiry has been received.']);
