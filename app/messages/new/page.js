import { redirect } from 'next/navigation';

import { addMessage } from '@/lib/messages';
// import { revalidatePath, revalidateTag } from 'next/cache';

export default function NewMessagePage() {
  async function createMessage(formData) {
    'use server';

    const message = formData.get('message');
    addMessage(message);
    // revalidatePath('/messages');
    // More efficient than other caching alternatives (cache: 'no-store', next: {revalidate:5}, export const revalidate, export const dynamic, unstable_noCache, etc.)
    // It is more efficient simply because you tell Next js explicitly which data you want to revalidate and refetch instead of setting up a period of time or similar strategy.
    revalidateTag('msg'); // Revalidates all requests acros the project that has the next: {tags: ['msg']} object on their requests.
    redirect('/messages');
  }

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows="5" />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}
