use std::io;

use actix_cors::Cors;
use actix_web::{get, web, App, HttpServer};

#[get("/podcast-{url}")]
async fn get_podcast(path: web::Path<String>) -> actix_web::Result<String> {
    let url = path.into_inner();
    let restructured_url = url.chars()
        .map(|char| if char == ':' { '/' } else { char })
        .collect::<String>();

    match reqwest::get(format!("https://{restructured_url}")).await {
        Ok(response) => {
            match response.text().await {
                Ok(content) => {
                    Ok(content)
                },
                Err(error) => {
                    panic!("Incorrect url {error}");
                },
            }
        },
        Err(error) => {
            panic!("Incorrect url {error}");
        },
    }
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allowed_origin("https://www.space-pod.com")
            .allowed_origin("https://space-pod.com")
            .allowed_methods(vec!["GET", "OPTIONS"])
            .max_age(3600);

        App::new()
            .wrap(cors)
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
