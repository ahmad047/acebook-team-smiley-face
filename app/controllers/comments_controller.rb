class CommentsController < ApplicationController
  before_action :set_post

def create
  if params[:comment][:content].length == 0
    redirect_to root_url, notice: "comment must not be empty"
  else
    @comment = @post.comments.build(comment_params)
    @comment.user_id = current_user.id

    if @comment.save
      redirect_to root_path
    else
      redirect_to root_path, notice: "failed to save"
    end
  end
end

def destroy
  @comment = @post.comments.find(params[:id])

  @comment.destroy
  redirect_to root_url, notice: "Comment deleted :("
end

private

def comment_params
  params.require(:comment).permit(:content)
end

def set_post
  @post = Post.find(params[:post_id])
end

end
