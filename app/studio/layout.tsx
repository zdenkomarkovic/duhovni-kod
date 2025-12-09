export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}