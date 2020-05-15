set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'
#
# Activate sprockets
activate :sprockets

after_configuration do
  sprockets.append_path File.join "#{root}", "bower_components"
end

activate :livereload

set :markdown_engine, :redcarpet

set :markdown,
  :fenced_code_blocks => true,
  :smartypants => true,
  :disable_indented_code_blocks => true,
  :prettify => true,
  :tables => true,
  :with_toc_data => true,
  :no_intra_emphasis => true

# Activate the syntax highlighter
activate :syntax

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets
  set :relative_links, true

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
