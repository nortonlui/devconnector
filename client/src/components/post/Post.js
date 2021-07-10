import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import Btn from '../layout/Btn';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = (props) => {
  const {
    getPost,
    post: { post, loading },
    match,
  } = props;

  React.useEffect(() => {
    getPost(match.params.id);
    //eslint-disable-next-line
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Btn to="/posts" classes="btn btn-light" title="Back to Posts" />
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        <h1>Comments</h1>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
