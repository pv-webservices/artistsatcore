/**
 * Every AI-generated asset on the site, with its placement and purpose.
 * Real client imagery (film stills, BTS photography, logos) covers everything else;
 * these fill only the gaps where no authentic image exists.
 */
const STYLE =
  'Editorial documentary photograph, shot on a full-frame cinema camera, 35mm lens, shallow depth of field, ' +
  'warm tungsten practical light against deep charcoal shadows, subtle haze, natural skin tones, fine film grain. ' +
  'No readable text, no logos, no watermarks, no brand names.';

export const GENERATED_ASSETS = [
  {
    id: 'ai-hybrid',
    placement: 'Home › AI video section + AI Video page hero',
    orientation: 'landscape',
    tags: ['hero', 'photoreal', 'complex-lighting'],
    alt: 'A cinema camera on set facing an LED wall showing a generated desert landscape while a director reviews the monitor',
    prompt:
      'Inside a dark film studio, a cinema camera on a tripod faces a large curved LED wall that displays a ' +
      'computer-generated golden-hour landscape of Rajasthan sand dunes. In the foreground an Indian director in a ' +
      'dark jacket, seen from behind in partial silhouette, studies a small on-camera monitor showing the same frame. ' +
      'A second crew member adjusts a soft light. The LED wall casts amber light across the floor. ' + STYLE,
  },
  {
    id: 'svc-post',
    placement: 'Services › Post-production card',
    orientation: 'landscape',
    tags: ['interior', 'key-visual'],
    alt: 'A colour grading suite with a grading control panel and reference monitors showing a warm cinematic frame',
    prompt:
      'A professional post-production colour grading suite at night. In the foreground, a colour grading control ' +
      'panel with three trackballs and rings, softly lit. Behind it, a large calibrated reference monitor shows a warm ' +
      'cinematic frame of a woman in an orange dupatta in a sunlit Indian village, with waveform scopes glowing on a ' +
      'smaller side screen. Dim room, neutral grey walls, soft bias lighting behind the monitors. ' + STYLE,
  },
  {
    id: 'svc-vr',
    placement: 'Services › VR and 360° video card',
    orientation: 'landscape',
    tags: ['architecture', 'interior'],
    alt: 'A 360-degree camera on a slim stand in a modern apartment overlooking a city skyline at dusk',
    prompt:
      'A compact professional 360-degree VR camera with multiple lenses mounted on a slim black stand in the centre ' +
      'of a modern, minimal luxury apartment living room. Floor-to-ceiling windows look out over the Gurgaon city ' +
      'skyline at blue-hour dusk with glass towers lit up. Warm interior lamps, oak floor, clean architectural lines, ' +
      'no people. ' + STYLE,
  },
  {
    id: 'ai-studio',
    placement: 'AI Video page › "AI video production" offering',
    orientation: 'landscape',
    tags: ['key-visual'],
    alt: 'A producer and an editor reviewing AI-generated storyboard frames in an edit suite',
    prompt:
      'A dim, modern video edit suite in India. A female producer and a male editor sit side by side, seen in ' +
      'three-quarter view from behind, reviewing a large monitor that shows a neat grid of cinematic storyboard ' +
      'frames: a city skyline, a product on a table, a smiling family, a desert road. An editing timeline glows on a ' +
      'second screen. The producer points at one frame. Warm desk lamp, cool monitor glow on their faces. ' + STYLE,
  },
  {
    id: 'svc-avatar',
    placement: 'Services › AI avatars and multi-language videos; AI page feature',
    orientation: 'portrait',
    tags: ['photoreal', 'key-visual'],
    alt: 'An Indian woman presenter in a blazer speaking to camera in a softly lit studio',
    prompt:
      'A confident Indian woman in her thirties, wearing a charcoal blazer, speaking warmly to camera as a corporate ' +
      'video presenter. Medium close-up, centred, studio setting with a dark textured backdrop and a soft key light ' +
      'from the left, gentle rim light in warm amber. Natural expression mid-sentence. ' + STYLE,
  },
];
