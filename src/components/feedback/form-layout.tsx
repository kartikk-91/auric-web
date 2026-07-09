export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="mx-auto flex w-full flex-1 flex-col">
        {children}
      </div>
    </div>
  )
}