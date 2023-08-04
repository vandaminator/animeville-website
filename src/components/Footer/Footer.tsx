import Link from "next/link"

function Footer() {
  return (
    <footer className="flex-1 mt-3 p-6 pb-8">
      <div className="flex gap-2">
        <Link href="/privacy-policy" >Privacy Policy</Link>
        <Link href="/terms" >Terms & conditions</Link>
      </div>
      <p>© Animixstream.site. </p>
    </footer>
  )
}

export default Footer