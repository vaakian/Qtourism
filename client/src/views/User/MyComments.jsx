import { Comment, List } from "antd"
import { useMemo } from "react"
import { useQuery } from "react-query"
import { useCommentService } from "../../services"
import { useUserProfile } from "../../store"

const MyComments = () => {
  const user = useUserProfile()
  const commentService = useCommentService()
  const { isFetched, isFetching, data: comments, error } = useQuery('comments', async () => {
    const { data } = await commentService.getUserComments()
    return data
  })
  const commentsToRender = useMemo(() => {
    if (isFetched && Array.isArray(comments)) {
      return comments.map(comment => ({
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: user.username,
        avatar: user.avatar_url,
        content: <p>{comment.content}</p>,
        datetime: comment.time,
      }))
    }
  }, [comments])
  if (!isFetched && isFetching) {
    return <h1>数据加载中</h1>
  }
  return (
    <>
      <List
        className="comment-list"
        header={`$2 replies`}
        itemLayout="horizontal"
        dataSource={commentsToRender}
        renderItem={item => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />
    </>
  )
}

export default MyComments