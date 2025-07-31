import { createServer, Model, Response } from 'miragejs';
export function makeServer({ environment = 'development' } = {}) {
    console.log('MirageJS server is running!');

    return createServer({
        environment,

        models: {
            song: Model,
        },

        seeds(server) {
            const titles = [
                "Bohemian Rhapsody", "Imagine", "Stairway to Heaven", "Hotel California",
                "Hey Jude", "Smells Like Teen Spirit", "Like a Rolling Stone", "What’s Going On",
                "Sweet Child O’ Mine", "Billie Jean", "Comfortably Numb", "Let It Be",
                "Born to Run", "Purple Rain", "Wish You Were Here", 
            ];

            const artists = [
                "Queen", "John Lennon", "Led Zeppelin", "Eagles", "The Beatles",
                "Nirvana", "Bob Dylan", "Marvin Gaye", "Guns N’ Roses", "Michael Jackson"
            ];

            const albums = [
                "Greatest Hits", "Legendary Tracks", "The Classics", "Essential Rock", "Timeless Tunes"
            ];

            const genres = [
                "Rock", "Pop", "Hard Rock", "Soft Rock", "Folk Rock",
                "Grunge", "Soul", "Classic Rock", "Alternative", "Metal"
            ];

            for (let i = 0; i < 15; i++) {
                server.create('song', {
                    id: i + 1,  
                    title: titles[i % titles.length],
                    artist: artists[i % artists.length],
                    album: albums[i % albums.length],
                    year: 1970 + (i % 50),
                    genre: genres[i % genres.length],
                });
            }

        },
        routes() {
            this.namespace = 'api';

            this.get('/songs', (schema, request) => {
                const page = parseInt(request.queryParams.page || 1);
                const limit = parseInt(request.queryParams.limit || 10);
                const allSongs = schema.songs.all();
                const total = allSongs.models.length;
                const totalPages = Math.ceil(total / limit);
                const start = (page - 1) * limit;
                const end = start + limit;

                const reversedSongs = allSongs.models.slice().reverse();

                return {
                    data: reversedSongs.slice(start, end),
                    total,
                    page,
                    limit,
                    totalPages,
                };
            });

            this.get('/songs/:id', (schema, request) => {
                const id = request.params.id;
                const song = schema.songs.find(id);
                if (!song) {
                    return new Response(404, {}, { error: 'Song not found' });
                }
                return song;
            });

            this.post('/songs', (schema, request) => {
                const attrs = JSON.parse(request.requestBody);
                return schema.songs.create(attrs);
            });

            this.put('/songs/:id', (schema, request) => {
                const id = request.params.id;
                const attrs = JSON.parse(request.requestBody);
                const song = schema.songs.find(id);
                return song.update(attrs);
            });

            this.delete('/songs/:id', (schema, request) => {
                const id = request.params.id;
                schema.songs.find(id).destroy();
                return new Response(200, {}, {});
            });
        },
    });
}