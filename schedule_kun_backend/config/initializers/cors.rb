# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ["localhost:3010", "https://schedule-kun-frontend.vercel.app/"]

    resource "*",
      headers: :any,
      expose: ["X-CSRF-Token"],
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
