use std::io;

use actix_web::{App, HttpServer};

#[actix_web::main]
async fn main() -> io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(
                actix_files::Files::new("/", "../dist")
                    .index_file("index.html")
            )
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
