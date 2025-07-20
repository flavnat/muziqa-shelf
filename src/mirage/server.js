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
                "Born to Run", "Purple Rain", "Wish You Were Here", "Every Breath You Take",
                "Losing My Religion", "Hallelujah", "I Still Haven’t Found What I’m Looking For",
                "Wonderwall", "Creep", "Back in Black", "Nothing Else Matters", "Yesterday",
                "Highway to Hell", "November Rain", "Kashmir", "Paint It Black", "Knocking on Heaven’s Door",
                "Zombie", "Come As You Are", "Blackbird", "Time", "Baba O’Riley", "Paranoid",
                "Dream On", "American Pie", "Enter Sandman", "Africa"
            ];

            const artists = ["Queen", "John Lennon", "Led Zeppelin", "Eagles", "The Beatles", "Nirvana", "Bob Dylan", "Marvin Gaye", "Guns N’ Roses", "Michael Jackson"];
            const albums = ["Greatest Hits", "Legendary Tracks", "The Classics", "Essential Rock", "Timeless Tunes"];

            for (let i = 0; i < 40; i++) {
                server.create('song', {
                    id: i + 1,
                    title: titles[i % titles.length],
                    artist: artists[i % artists.length],
                    album: albums[i % albums.length],
                    year: 1970 + (i % 50),
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

                return {
                    data: allSongs.models.slice(start, end),
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