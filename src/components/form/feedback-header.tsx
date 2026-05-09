import {
  Eye,
  Send,
  MoreHorizontal,
} from "lucide-react";

export default function FormBuilderHeader({
  form,
  title,
  tagline,
}: any) {
  const handlePublish =
    async () => {
      try {
        const res =
          await fetch(
            "/api/form/create",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                title,
                tagLine: tagline,
                schema: {
                  fields:
                    form.fields,
                  settings: {},
                },
              }),
            }
          );

        await res.json();
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="px-4 py-4 sm:px-6 lg:px-8 lg:py-6">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">


          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold text-gray-900 sm:text-2xl">
              Feedback Form Builder
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Create and customize
              forms to collect
              valuable feedback.
            </p>
          </div>


          <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4">

            <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:px-5">
              <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              Preview
            </button>

            <button
              onClick={
                handlePublish
              }
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              Publish
            </button>

            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}