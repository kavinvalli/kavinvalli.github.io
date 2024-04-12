import { redirect } from "next/navigation";

export async function GET(request, { params }) {
  const { shortlink } = params;

  console.log({ shortlink });

  if (!shortlink) {
    return new Response("No shortlink provided", { status: 400 });
  }

  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}?filterByFormula=slug = "${shortlink}"`;
  console.log({ url });
  const res = await fetch(encodeURI(url), {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
    },
  });

  console.log({ res });

  if (!res.ok) {
    return new Response("Error fetching data", { status: 500 });
  }

  const data = await res.json();

  if (data.records.length === 0) {
    return redirect("https://kavin.me");
  }

  const record = data.records[0];
  const { target } = record.fields;

  return redirect(target);
}
