import type { Meta, StoryObj } from '@storybook/react-vite';
import Comments from './comments';
import type { CommentData } from './types';

const meta: Meta<typeof Comments> = {
  title: 'Components/Comment System',
  component: Comments,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const initialComments: CommentData[] = [
  {
    id: 1,
    author: {
      name: 'Kanchan Chauhan',
      avatarUrl: 'https://i.pravatar.cc/40?img=1',
    },
    timestamp: '1 month ago',
    text: 'Hi @Devarshi Sathiya, did you check the assignment sent over by the candidate?',
    replies: [
      {
        id: 2,
        author: {
          name: 'Devarshi Sathiya',
          avatarUrl: 'https://i.pravatar.cc/40?img=2',
        },
        timestamp: '1 month ago',
        text: 'Minor Update: Seems the assignment submission was not made properly adhering the guidelines, have asked the candidate to use our portal instead.',
        replies: [
          {
            id: 3,
            author: {
              name: 'Niraj Gautam',
              avatarUrl: 'https://i.pravatar.cc/40?img=3',
            },
            timestamp: '1 month ago',
            text: 'Sure, works for me. Thanks!',
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    author: {
      name: 'Niraj Gautam',
      avatarUrl: 'https://i.pravatar.cc/40?img=3',
    },
    timestamp: '1 month ago',
    text: 'Hey @Devarshi Sathiya, can you tell me what happened to my assignment submission? Seems to be pending for a while.',
    replies: [
      {
        id: 5,
        author: {
          name: 'Devarshi Sathiya',
          avatarUrl: 'https://i.pravatar.cc/40?img=2',
        },
        timestamp: '1 month ago',
        text: "Yes, I am currently checking it. It seems to be well done, I'll submit over the full report by the end of the day.",
        replies: [],
      },
    ],
  },
];

export const FullThread: StoryObj<typeof Comments> = {
  name: 'Full Interactive Comment Thread',
  render: () => <Comments initialComments={initialComments} />,
};