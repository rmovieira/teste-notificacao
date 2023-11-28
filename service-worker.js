/* eslint-disable no-restricted-globals */
self.addEventListener('push', event => {
    console.log("=============")
    if (event.data) {
        const promiseChain = self.registration.showNotification(event.data.text());

        event.waitUntil(promiseChain);
    } else {
        console.log('This push event has no data.');
    }
});