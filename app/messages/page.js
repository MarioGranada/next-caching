// import { unstable_noStore } from 'next/cache';

import Messages from '@/components/messages';
import { getMessages } from '@/lib/messages';

// export const revalidate = 5; // It works the same as next: { revalidate: 5 } in fetch function.
// export const dynamic = 'force-dynamic'; // Tells Next js to always fetch the data. Same as cache: 'no-store' --> this changes the page from being a static page to a dynamic page. In the build, this page will look as a dynamic page, Same as using getServerSideProps on Page Router approach. Default is 'force-static' which so leads to a static page in the build process as well as using getStaticProps with Page Router approach.
// export const dynamic = 'auto'; // default
// export const dynamic = 'force-static';

export default async function MessagesPage() {
  // unstable_noStore(); // This can be used on a function basis, where it will only be applied and won't cache the data on the function it is written on.
  // const response = await fetch('http://localhost:8080/messages', {
  //   // cache: 'no-store', // disable caching, it tells nextjs to refetch all the data and use this data to revalidate and rerender the path it is used on.
  //   // Default to 'force-cache', this is Next js default.
  //   // next: {
  //   //   // It keeps the data on the given time, in this case it keeps the data 5 seconds. After that it will refetch the data.
  //   //   // So, if the user fetches the data and reloads the page in the time frame of 5 seconds, Nextjs won't execute the fetch function.
  //   //   // However, if the user makes the request after the 5 seconds time frame, Next js will execute the request and bring new data.
  //   //   // This works similar to react tanstack query for caching data, where the data is kept for the given time until the user refetches again after that given time.
  //   //   revalidate: 5,
  //   // },

  //   next: {
  //     tags: ['msg'],
  //   },
  // });
  // const messages = await response.json();

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
