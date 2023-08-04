import policyText from "@/components/policytext";

function Policy() {
  return <div id="daInfo" className="bg-white p-2 rounded-md" dangerouslySetInnerHTML={{__html: policyText}}></div>;
}

export default Policy;
