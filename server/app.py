from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_cors import CORS
import os
import requests

app = Flask(__name__, static_folder='../client/build')
CORS(app)

UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos'
UNSPLASH_ACCESS_KEY = 'wMgRBGqp6jx2UFAYiDWpUw8GfH61IGf_6dL5KOgaAEQ'

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path != "" and os.path.exists(f"{app.static_folder}/{path}"):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

# Serve static files from the React build folder
@app.route('/static/<path:path>')
def serve_static_files(path):
    return send_from_directory(f'{app.static_folder}/static', path)


# api code
@app.route('/api/image-search', methods=['GET'])
def image_search():
    query = request.args.get('query', '')
    num_results = request.args.get('num_results', 10)  # You may increase this if needed

    if not query:
        return jsonify({'error': 'No search query provided'}), 400

    # Make request to Unsplash API with additional parameters
    response = requests.get(
        UNSPLASH_API_URL,
        headers={'Authorization': f'Client-ID {UNSPLASH_ACCESS_KEY}'},
        params={'query': query, 'per_page': num_results, 'order_by': 'latest'}  # or 'latest'
    )

    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch images from Unsplash'}), response.status_code

    data = response.json()
    images = [{'url': img['urls']['small'], 'description': img.get('alt_description', 'No description')} for img in data.get('results', [])]

    return jsonify(images)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

# api sucks for now
# @app.route('/api/search', methods=['GET'])
# def search_music():
#     query = request.args.get('query', '')
#     if not query:
#         return jsonify([])
    
#     base_url = 'https://musicbrainz.org/ws/2'
#     headers = {
#         'Accept': 'application/json',
#         'User-Agent': 'musictierlistmaker/1.0.0'
#     }
    
#     try:
#         # Search across different entities
#         artist_response = requests.get(
#             f"{base_url}/artist?query={query}&fmt=json&limit=5",
#             headers=headers
#         ).json()
        
#         album_response = requests.get(
#             f"{base_url}/release-group?query={query}&fmt=json&limit=5",
#             headers=headers
#         ).json()
        
#         song_response = requests.get(
#             f"{base_url}/recording?query={query}&fmt=json&limit=5",
#             headers=headers
#         ).json()
        
#         # Process and combine results
#         results = []
        
#         # Add artists
#         for artist in artist_response.get('artists', []):
#             results.append({
#                 'text': f"{artist['name']} (Artist)",
#                 'background': '#7FBFFF',
#                 'type': 'artist',
#                 'id': artist['id']
#             })
            
#         # Add albums
#         for album in album_response.get('release-groups', []):
#             artist_name = album['artist-credit'][0]['name'] if album.get('artist-credit') else 'Unknown'
#             results.append({
#                 'text': f"{album['title']} by {artist_name} (Album)",
#                 'background': '#FFBF7F',
#                 'type': 'album',
#                 'id': album['id']
#             })
            
#         # Add songs
#         for song in song_response.get('recordings', []):
#             artist_name = song['artist-credit'][0]['name'] if song.get('artist-credit') else 'Unknown'
#             results.append({
#                 'text': f"{song['title']} by {artist_name} (Song)",
#                 'background': '#BFFF7F',
#                 'type': 'song',
#                 'id': song['id']
#             })
            
#         return jsonify(results)
        
#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({'error': str(e)}), 500