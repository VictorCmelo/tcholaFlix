import { SiteClient } from "datocms-client";

export default async function recebedorDeRequest(request, response) {
  if (request.method === "POST") {
    const TOKEN = "f2fe7d3e9631dee3691d300d254301";
    const client = new SiteClient(TOKEN);

    // console.log(...request.body);

    const registroCriado = await client.items.create({
      itemType: "967477",
      ...request.body,
    //     title: "Comunidade do Vitão",
    //     imageUrl: "https://github.com/VictorCmelo.png",
    //     creatorSlug: "ovictormelo",
    });

    response.json({
      dados: "dado criado",
      registroCriado: registroCriado,
    });
    return;
  }

  response.status(404).json({
    message: "Ainda não temos nada no GET",
  });
}
