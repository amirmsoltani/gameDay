import { useEffect } from 'react';
import { useQueryClient, UseInfiniteQueryResult } from 'react-query';
import { useGetUser } from 'src/auth/UserProvider';
import { subscribe } from 'src/subscription/subscription';
import {
    MessageAddedDocument,
    MessageAddedSubscription,
    SortEnumType,
} from 'src/graphql/generated';
import { updateChatCount } from 'src/redux/actions/actions';
import { useDispatch,useSelector } from 'react-redux';


export function useSubscribeMessages() {
    const user = useGetUser();
    const queryClient = useQueryClient();
    // const {activeTabParent} = useSelector(({ pageData }: any) => pageData);
    const dispatch = useDispatch();

  

    useEffect(() => {
        if (!user) return;

        const unsbscribe = subscribe(MessageAddedDocument, { userId: user.id }, listener);

        function listener(e) {
            try {
                const data = JSON.parse(e.data);

                if (data.type === 'ka') return; //keep alive!

                const message: MessageAddedSubscription = data?.payload?.data;

                if (!message?.messageAdded) return;
                //
                // if(activeTabParent?.id !== "chat"){
                //     dispatch(updateChatCount());
                // }

                const senderId = message.messageAdded.senderId;
                const conversationId = message.messageAdded.conversationId;

                if (senderId === user.id) return;

                queryClient.refetchQueries('message_getUserMessages');
        
                const input = {
                    conversationId: Number(conversationId) || null,
                    skip: 0,
                    take: 50,
                    order: { id: SortEnumType.Desc }
                };

                const key = ['message_getConversation.infinite', input ,user];

                const chatCache: UseInfiniteQueryResult = queryClient.getQueryData(key);

                const conversation = message.messageAdded;
                // @ts-ignore
                chatCache?.pages?.[0]?.message_getConversation?.result?.items?.unshift?.(
                    conversation
                );

                queryClient.setQueryData(key, chatCache);
            } catch (err) {
                console.log(err);
            }
        }

        return () => unsbscribe();
    }, [user]);
}
