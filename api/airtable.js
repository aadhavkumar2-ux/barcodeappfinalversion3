export default async function handler(req, res) {
    const BASE_ID = "appswjIza3rYy68a1";

    const { table, id } = req.query;

    const url =
        `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(table)}`
        + (id ? `/${id}` : "");

    try {
        const response = await fetch(url, {
            method: req.method,
            headers: {
                Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
                "Content-Type": "application/json"
            },
            body: ["POST","PATCH"].includes(req.method)
                ? JSON.stringify(req.body)
                : undefined
        });

        const data = await response.json();

        res.status(response.status).json(data);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}
