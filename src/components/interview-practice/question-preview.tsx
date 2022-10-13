import LayoutHeader from '@/layout/app-layout/layout-header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { ArrowDownIcon } from 'src/assets/common/ArrowDownIcon';
import { PlusIcon } from 'src/assets/common/PlusIcon';
import { GetInterviewQuestionQuery, useCreateInterviewQuestionMutation, useGetInterviewCategoryQuery, useInfiniteGetInterviewQuestionQuery } from 'src/graphql/generated';
import useDebounce from 'src/hooks/useDebounce';
import SearchInput from '../base/input/search-input';
import Loading from '../loading';
import Question from '../question';
import QuestionForm from '../question/question-from';
import { QuestionHeaderWrapper, QuestionPreviewWrapper } from './question-preview-style';


function QuestionPreviewPage() {
    const {query} = useRouter();
    
    const totalItems = useRef<number | null>(null);
    const [itemList, setItemList] = useState<
    GetInterviewQuestionQuery['interviewQuestion_getInterviewQuestions']['result']['items']
    >([]);
    const [searchText, setSearchText] = useState<string>('');
    const finalSearchText = useDebounce(searchText, 500);
    const [end, setEnd] = useState(false);

    const [moodIsAdd, setMood] = useState<boolean>(Boolean(query.add));
    

    const { isLoading, isFetchingNextPage, fetchNextPage } = useInfiniteGetInterviewQuestionQuery(
        {
            take: 10,
            skip: 0,
            where: {
                description: { contains: finalSearchText }
            },
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            onSuccess: ({ pages }) => {
                const length = pages.length;
                if (length === 1) {
                    totalItems.current =
                        pages[0].interviewQuestion_getInterviewQuestions!.result!.totalCount;
                    setItemList([...pages[0].interviewQuestion_getInterviewQuestions.result.items]);
                } else {
                    setItemList([
                        ...itemList,
                        ...(pages[length - 1].interviewQuestion_getInterviewQuestions.result
                            .items || [])
                    ]);
                }
                if (
                    pages[length - 1].interviewQuestion_getInterviewQuestions.result.pageInfo
                        .hasNextPage === false
                ) {
                    setEnd(true);
                }
            },
            getNextPageParam: (_, pages) => ({ skip: pages.length * 10 })
        }
    );

    const { data } = useGetInterviewCategoryQuery();

    const {isLoading:createStatus,mutate} = useCreateInterviewQuestionMutation({onSuccess:(data)=>{
        setItemList([data.interviewQuestion_addQuestion.result, ...itemList]);
        setMood(false);
    }})
    

    if (isLoading) return <Loading />;

    const categories = data?.interviewCategory_getInterviewCategories.result.items.map(
        (category) => {
            return { label: category.title, value: category.id.toString() };
        }
    );
       
        
  return (
      <QuestionPreviewWrapper
          onScroll={(event: any) => {
              const { scrollTop, scrollHeight, clientHeight } = event.target;
              if (scrollTop + clientHeight >= scrollHeight * 0.5 && !end && !isFetchingNextPage) {
                  fetchNextPage();
              }
          }}>
          <LayoutHeader>
              <QuestionHeaderWrapper>
                  <div className="question__left-items">
                      <Link href="/interview-practice">
                          <a className="question__back-btn">
                              <ArrowDownIcon />
                          </a>
                      </Link>
                      <span className="question__breadcrumb">Interview practice/Question</span>
                  </div>
                  <SearchInput
                      onChange={(event: any) => {
                          setSearchText(event.target.value);
                      }}
                  />
                  <button
                      className="question__link-button"
                      onClick={() => {
                          setMood(true);
                      }}
                      disabled={moodIsAdd}>
                      <PlusIcon className="link-button__plus" /> Add New question
                  </button>
              </QuestionHeaderWrapper>
          </LayoutHeader>
          {moodIsAdd && (
              <QuestionForm
                  options={categories}
                  onCancel={() => {
                      setMood(false);
                  }}
                  onSubmit={(values) => {
                      mutate({
                          data: {
                              interviewCategoryId: +values.category,
                              description: values.question,
                              title: `Question ${totalItems.current + 1}`
                          }
                      });
                  }}
                  loading={createStatus}
              />
          )}
          {itemList.map((question, index) => (
              <Question
                  counter={index + (moodIsAdd ? 2 : 1)}
                  question={question.description}
                  key={question.title}
              />
          ))}
      </QuestionPreviewWrapper>
  );
}

export default QuestionPreviewPage