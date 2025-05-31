function Footer() {
  return (
    <footer className="w-full border-t border-border bg-transparent backdrop-blur-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center items-center">
        <p className="text-md font-medium text-center">
          © {new Date().getFullYear()} AI{' '}
          <span className="font-semibold text-primary">CHATBOT</span> &mdash;
          All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
