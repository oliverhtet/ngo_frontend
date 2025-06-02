import { apiService } from "@/lib/api"
import type { BlogPost } from "@/lib/types"
import { notFound } from "next/navigation"

type Props = {
  params: {
    documentId: string
  }
}

export default async function BlogPostPage({ params }: Props) {
   
  const post = await apiService.getBlogPost(params.documentId) as BlogPost | null

 console.log("Fetched blog post:", post)

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 text-sm mb-6">
        Published on {new Date(post.publishedAt).toLocaleDateString()}
      </div>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}
