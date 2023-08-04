import termsText from "@/components/termsText";

function Terms() {
  return (
    <div
      className="rounded-md bg-white p-2"
      dangerouslySetInnerHTML={{ __html: termsText }}
    ></div>
  );
}

export default Terms;
