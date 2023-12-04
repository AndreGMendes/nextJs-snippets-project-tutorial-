
/* eslint-disable react/no-unescaped-entities */




const SnippetNotFound = () => {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center custom-background">
      <h1 className="text-4xl bold text-red-700">Page not Found</h1>
      <p className="text-gray-900">The <span className="text-2xl bold">Snippet</span> you're trying to access is not available in the database</p>
    </div>
  )
}

export default SnippetNotFound
