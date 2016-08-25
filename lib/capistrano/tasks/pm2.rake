require 'json'

namespace :pm2 do

  def app_status
    within current_path do
      ps = JSON.parse(capture :pm2, :jlist, fetch(:app_command))
      if ps.empty?
        return nil
      else
        # status: online, errored, stopped
        return ps[0]["pm2_env"]["status"]
      end
    end
  end

  def restart_app
    within current_path do
      execute :pm2, :restart, fetch(:app_command)
    end
  end

  def start_app
    within current_path do
      execute :pm2, :stop, fetch(:app_command)
    end
  end

  desc 'Restart app gracefully'
  task :restart do
    on roles(:app) do
      case app_status
      when nil
        info 'App is not registerd'
        execute :pm2, :start, 'dist/server/index.js'
      when 'stopped'
        info 'App is stopped'
        execute :pm2, :start, 'dist/server/index.js'
      when 'errored'
        info 'App has errored'
        execute :pm2, :start, 'dist/server/index.js'
      when 'online'
        info 'App is online'
        execute :pm2, :start, 'dist/server/index.js'
      end
    end
  end

end
