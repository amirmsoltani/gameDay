import { useSubscribeMessages } from 'src/graphql/chat/hooks';

export default function SubscribeMessagesComponent() {
    // This component only rerenders itself. Not the whole app.
    useSubscribeMessages();

    return null;
}
