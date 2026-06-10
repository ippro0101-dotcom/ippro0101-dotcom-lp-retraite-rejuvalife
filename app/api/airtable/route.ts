import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, dietPreference, motivations } = await req.json();

    const token = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || "Clients";

    // If Airtable is not yet configured, we log the action and return a success mock or guided message
    if (!token || !baseId) {
      console.warn("Airtable is not configured yet. Missing AIRTABLE_PERSONAL_ACCESS_TOKEN or AIRTABLE_BASE_ID.");
      return NextResponse.json({ 
        success: true, 
        mocked: true,
        message: "Configuration Airtable manquante, mais le formulaire fonctionne parfaitement locale-mock ! Veuillez configurer les clés d'environnement dans AI Studio."
      });
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              "Prénom": firstName || "",
              "Nom": lastName || "",
              "Email": email || "",
              "Téléphone": phone || "",
              "Expérience Détox/Yoga": dietPreference || "",
              "Motivations": motivations || "",
              "Date d'inscription": new Date().toISOString()
            }
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Airtable API error response:", errorText);
      return NextResponse.json({ 
        success: false, 
        error: `Erreur Airtable: ${response.statusText}`, 
        details: errorText 
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Internal API error during form submission:", error);
    return NextResponse.json({ success: false, error: error.message || "Une erreur inattendue est survenue." }, { status: 500 });
  }
}
