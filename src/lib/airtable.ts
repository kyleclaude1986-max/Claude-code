const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

interface AirtableRecord<T> {
  id: string;
  fields: T;
  createdTime: string;
}

interface AirtableResponse<T> {
  records: AirtableRecord<T>[];
  offset?: string;
}

async function airtableFetch<T>(
  table: string,
  options: {
    method?: string;
    filterByFormula?: string;
    fields?: string[];
    sort?: { field: string; direction: "asc" | "desc" }[];
    body?: Record<string, unknown>;
  } = {}
): Promise<AirtableRecord<T>[]> {
  const { method = "GET", filterByFormula, fields, sort, body } = options;

  if (method !== "GET") {
    const res = await fetch(`${AIRTABLE_URL}/${encodeURIComponent(table)}`, {
      method,
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Airtable ${method} error: ${res.status} - ${error}`);
    }

    const data = await res.json();
    return [data];
  }

  const params = new URLSearchParams();
  if (filterByFormula) params.set("filterByFormula", filterByFormula);
  if (fields) fields.forEach((f) => params.append("fields[]", f));
  if (sort) {
    sort.forEach((s, i) => {
      params.append(`sort[${i}][field]`, s.field);
      params.append(`sort[${i}][direction]`, s.direction);
    });
  }

  const allRecords: AirtableRecord<T>[] = [];
  let offset: string | undefined;

  do {
    if (offset) params.set("offset", offset);

    const res = await fetch(
      `${AIRTABLE_URL}/${encodeURIComponent(table)}?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Airtable GET error: ${res.status} - ${error}`);
    }

    const data: AirtableResponse<T> = await res.json();
    allRecords.push(...data.records);
    offset = data.offset;
  } while (offset);

  return allRecords;
}

// ---- Client types & functions ----

export interface ClientFields {
  "First Name": string;
  "Last Name": string;
  Phone: string;
  Email: string;
  Address: string;
  Status: "Active" | "Unsubscribed";
  "Date Signed Up": string;
}

export async function addClient(data: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}) {
  return airtableFetch<ClientFields>("Clients", {
    method: "POST",
    body: {
      fields: {
        "First Name": data.firstName,
        "Last Name": data.lastName,
        Phone: data.phone,
        Email: data.email,
        Address: data.address,
        Status: "Active",
        "Date Signed Up": new Date().toISOString().split("T")[0],
      },
    },
  });
}

export async function getActiveClients() {
  return airtableFetch<ClientFields>("Clients", {
    filterByFormula: '{Status} = "Active"',
  });
}

export async function getClientByPhone(phone: string) {
  const records = await airtableFetch<ClientFields>("Clients", {
    filterByFormula: `{Phone} = "${phone}"`,
  });
  return records[0] || null;
}

// ---- Tile types & functions ----

export interface TileFields {
  "Tile Name": string;
  Image: { url: string; filename: string; type: string }[];
  Description: string;
  "Scheduled Date": string;
  Status: "Pending" | "Sent";
}

export async function getTileForDate(dateStr: string) {
  const records = await airtableFetch<TileFields>("Tiles", {
    filterByFormula: `AND({Scheduled Date} = "${dateStr}", {Status} = "Pending")`,
  });
  return records[0] || null;
}

export async function getTileById(tileId: string) {
  const res = await fetch(
    `${AIRTABLE_URL}/${encodeURIComponent("Tiles")}/${tileId}`,
    {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    }
  );

  if (!res.ok) {
    if (res.status === 404) return null;
    const error = await res.text();
    throw new Error(`Airtable GET error: ${res.status} - ${error}`);
  }

  return (await res.json()) as AirtableRecord<TileFields>;
}

export async function updateTileStatus(
  tileId: string,
  status: "Pending" | "Sent"
) {
  const res = await fetch(
    `${AIRTABLE_URL}/${encodeURIComponent("Tiles")}/${tileId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: { Status: status } }),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Airtable PATCH error: ${res.status} - ${error}`);
  }

  return res.json();
}

// ---- Sample Request types & functions ----

export interface SampleRequestFields {
  Client: string[];
  Tile: string[];
  "Shipping Address": string;
  "Request Date": string;
  Status: "Pending" | "Shipped";
}

export async function createSampleRequest(data: {
  clientId: string;
  tileId: string;
  shippingAddress: string;
}) {
  return airtableFetch<SampleRequestFields>("Sample Requests", {
    method: "POST",
    body: {
      fields: {
        Client: [data.clientId],
        Tile: [data.tileId],
        "Shipping Address": data.shippingAddress,
        "Request Date": new Date().toISOString().split("T")[0],
        Status: "Pending",
      },
    },
  });
}
