export  const buildCommentTree = (flatComments: any[]) => {
        const commentMap = new Map();
        const roots: any[] = [];

        for (const comment of flatComments) {
            comment.dataValues.replies = [];
            commentMap.set(comment.id, comment);
        }

        for (const comment of flatComments) {
            const parentId = comment.parentId;
            if (parentId) {
                const parent = commentMap.get(parentId);
                if (parent) {
                    parent.dataValues.replies.push(comment);
                }
            } else {
                roots.push(comment);
            }
        }

        return roots;
    };