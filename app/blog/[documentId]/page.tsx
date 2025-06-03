import { Navbar } from "@/components/layout/navbar"
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

  if (!post) {
    notFound()
  }

  const { title, publishedAt, content } = post.data

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
          {title}
        </h1>

        <p className="text-sm text-gray-500 mb-10">
          Published on <time dateTime={publishedAt}>{new Date(publishedAt).toLocaleDateString()}</time>
        </p>

        <div className="prose prose-blue prose-lg max-w-none">
          {/* If content is HTML from CMS like Strapi */}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  )
}
