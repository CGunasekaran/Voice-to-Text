import { Template } from '@/types';

export const templates: Template[] = [
  {
    id: 'transcription',
    name: 'Simple Transcription',
    description: 'Convert speech to text exactly as spoken',
    icon: 'mic',
    color: 'blue',
    prompt: 'Transcribe the following speech accurately:',
    placeholder: 'Your transcribed text will appear here...',
    features: [
      'Real-time transcription',
      'Punctuation correction',
      'Speaker identification',
      'Timestamp markers',
    ],
    example: {
      input: 'Hello this is a test of the voice transcription system',
      output: 'Hello, this is a test of the voice transcription system.',
    },
  },
  {
    id: 'story',
    name: 'Story Generator',
    description: 'Transform your voice into a creative story',
    icon: 'book',
    color: 'purple',
    prompt:
      'Transform the following speech into a creative, engaging story with proper narrative structure, descriptions, and dialogue:',
    placeholder: 'Your story will be generated here...',
    features: [
      'Creative narrative',
      'Character development',
      'Scene descriptions',
      'Dialogue formatting',
    ],
    example: {
      input: 'A boy found a magical key in the forest',
      output: `The old forest was quiet that morning, save for the crunch of fallen leaves beneath young Thomas's feet. As he wandered deeper into the woods, something glinted in a patch of sunlight. Kneeling down, he brushed away the moss to reveal an ornate golden key, its surface covered in strange, swirling symbols that seemed to shimmer and move in the light.

"What could this open?" Thomas wondered aloud, his heart racing with excitement.`,
    },
  },
  {
    id: 'email',
    name: 'Email Composer',
    description: 'Convert voice notes into professional emails',
    icon: 'mail',
    color: 'green',
    prompt:
      'Convert the following voice notes into a professional email with proper greeting, body, and closing:',
    placeholder: 'Your email will be composed here...',
    features: [
      'Professional formatting',
      'Auto subject line',
      'Proper salutation',
      'Clear structure',
    ],
    example: {
      input: 'Tell John I need the project report by Friday. Ask if he needs help.',
      output: `Subject: Project Report - Due Friday

Dear John,

I hope this email finds you well. I wanted to reach out regarding the project report we discussed earlier.

Could you please ensure the report is completed and submitted by this Friday? If you need any assistance or have questions about the requirements, please don't hesitate to reach out. I'm happy to help in any way I can.

Looking forward to hearing from you.

Best regards,
[Your Name]`,
    },
  },
  {
    id: 'letter',
    name: 'Letter Writer',
    description: 'Create formal or informal letters from voice',
    icon: 'file-text',
    color: 'orange',
    prompt:
      'Convert the following speech into a well-formatted letter with proper structure and tone:',
    placeholder: 'Your letter will be written here...',
    features: [
      'Formal structure',
      'Date and address',
      'Proper formatting',
      'Signature block',
    ],
    example: {
      input: 'Write to the manager about requesting time off for vacation next month',
      output: `[Date]

[Manager's Name]
[Company Name]
[Address]

Dear [Manager's Name],

I am writing to formally request time off for vacation purposes. I would like to take leave from [start date] to [end date] next month for personal vacation time.

I have ensured that all my current projects will be completed before my departure, and I have briefed [colleague's name] who has kindly agreed to handle any urgent matters during my absence.

I would be happy to discuss this request at your convenience and make any necessary arrangements to ensure a smooth workflow during my time away.

Thank you for considering my request.

Sincerely,
[Your Name]`,
    },
  },
  {
    id: 'blog',
    name: 'Blog Post',
    description: 'Turn your thoughts into engaging blog posts',
    icon: 'newspaper',
    color: 'pink',
    prompt:
      'Transform the following ideas into an engaging blog post with introduction, main points, and conclusion:',
    placeholder: 'Your blog post will be created here...',
    features: [
      'SEO-friendly structure',
      'Engaging headlines',
      'Paragraph formatting',
      'Call-to-action',
    ],
    example: {
      input: 'Benefits of morning exercise include better mood and more energy',
      output: `# Why Morning Exercise Will Transform Your Day

Have you ever wondered why successful people swear by their morning workout routine? The secret lies in the powerful benefits that morning exercise brings to both your body and mind.

## The Mood-Boosting Power of Morning Movement

Starting your day with physical activity triggers the release of endorphins, often called "feel-good hormones." These natural chemicals help reduce stress and anxiety, setting a positive tone for your entire day. Even just 20 minutes of exercise can significantly improve your mood and mental clarity.

## Energy That Lasts All Day

While it might seem counterintuitive, expending energy in the morning actually gives you more energy throughout the day. Morning exercise jumpstarts your metabolism, improves circulation, and enhances oxygen flow to your brain, leading to increased alertness and productivity.

## Making It Work For You

The key is to start small and be consistent. Whether it's a brisk walk, yoga, or a full workout, find what works for you and make it a non-negotiable part of your morning routine.

Ready to transform your mornings? Start tomorrow with just 10 minutes of movement and experience the difference for yourself.`,
    },
  },
  {
    id: 'notes',
    name: 'Meeting Notes',
    description: 'Convert voice to organized meeting notes',
    icon: 'clipboard',
    color: 'cyan',
    prompt:
      'Organize the following speech into structured meeting notes with key points, action items, and decisions:',
    placeholder: 'Your meeting notes will be organized here...',
    features: [
      'Bullet point format',
      'Action items',
      'Key decisions',
      'Attendee tracking',
    ],
    example: {
      input: 'Discussed new product launch. John will handle marketing. Need budget approval by next week.',
      output: `# Meeting Notes - Product Launch Discussion

**Date:** [Current Date]
**Attendees:** [List attendees]

## Key Discussion Points
- New product launch timeline reviewed
- Marketing strategy outlined
- Budget requirements discussed

## Decisions Made
- Proceed with product launch as planned
- Marketing approach approved

## Action Items
- [ ] John: Develop marketing strategy and plan (Due: [Date])
- [ ] Team: Submit budget approval request (Due: Next week)
- [ ] All: Review and provide feedback on launch timeline

## Next Steps
- Schedule follow-up meeting after budget approval
- Marketing team to present detailed plan`,
    },
  },
  {
    id: 'todo',
    name: 'Todo List',
    description: 'Create organized task lists from voice',
    icon: 'check-square',
    color: 'red',
    prompt:
      'Convert the following speech into an organized, prioritized todo list:',
    placeholder: 'Your todo list will be created here...',
    features: [
      'Priority sorting',
      'Checkbox formatting',
      'Categorization',
      'Due dates',
    ],
    example: {
      input: 'Buy groceries, finish report, call dentist, reply to emails',
      output: `# Todo List - [Date]

## High Priority
- [ ] Finish report
- [ ] Reply to emails

## Medium Priority
- [ ] Call dentist
- [ ] Buy groceries

## Notes
All tasks to be completed today. Report is most urgent.`,
    },
  },
  {
    id: 'social',
    name: 'Social Post',
    description: 'Create social media posts from voice',
    icon: 'share-2',
    color: 'indigo',
    prompt:
      'Transform the following into an engaging social media post with hashtags:',
    placeholder: 'Your social post will be created here...',
    features: [
      'Platform optimization',
      'Hashtag suggestions',
      'Emoji integration',
      'Character count',
    ],
    example: {
      input: 'Just launched our new product. Excited to share with everyone.',
      output: `🚀 Big news! We're thrilled to announce the launch of our latest product! 

After months of hard work and dedication, we're excited to finally share this with you all. Thank you to everyone who made this possible! 

Check it out and let us know what you think! 💙

#ProductLaunch #Innovation #NewProduct #Excited #TeamWork #Technology`,
    },
  },
];
