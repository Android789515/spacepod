use std::io;

use actix_web::{get, http::header::ContentType, web, App, HttpResponse, HttpServer};

#[get("/podcast-{url}")]
async fn get_podcast(path: web::Path<String>) -> HttpResponse {
    let url = path.into_inner();
    let restructured_url = url.chars()
        .map(|char| if char == ':' { '/' } else { char })
        .collect::<String>();

    let content = match reqwest::get(format!("https://{restructured_url}")).await {
        Ok(response) => {
            match response.text().await {
                Ok(content) => {
                    content
                },
                Err(error) => {
                    panic!("Incorrect url {error}");
                },
            }
        },
        Err(error) => {
            panic!("Incorrect url {error}");
        },
    };

    HttpResponse::Ok()
        .content_type(ContentType::xml())
        .insert_header(("Access-Control-Allow-Origin", "https://space-pod.com"))
        .insert_header(("Access-Control-Allow-Methods", "GET, OPTIONS"))
        .body(content)
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(get_podcast)
            .service(
                actix_files::Files::new("/", "../dist")
                    .index_file("index.html")
            )
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
