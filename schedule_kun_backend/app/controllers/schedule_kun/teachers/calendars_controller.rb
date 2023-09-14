module ScheduleKun
  module Teachers
    class CalendarsController < ScheduleKun::Teachers::ApplicationController
      class DateNotFoundError < StandardError; end

      # GET /schedule_kun/teachers/calendars/month
      def month
        raise DateNotFoundError if params[:year].blank? || params[:month].blank?

        year = params[:year]
        month = params[:month]

        start_date = Time.zone.parse("#{year}/#{month}/1").beginning_of_day
        end_date = start_date.end_of_month

        all_lessons = current_teacher.lessons.enabled.between_date(start_date, end_date).order(:start_time)

        row = 0
        json = (Date.parse(start_date.to_s)..Date.parse(end_date.to_s)).each_with_object({}).with_index do |(date, arr), ind|
          lessons = all_lessons.select { |l| Date.parse(l.start_time.to_s) == date }
          column = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].index(date.strftime("%a"))
          row += 1 if column.zero? && !ind.zero?

          arr[row] = [] unless arr.key?(row)

          if ind.zero?
            (0...column).each do |col|
              arr[row] << { row: row, column: col, day: (start_date - (column - col).day).day, month: (date - 1.month).month, year: (date - 1.month).year }
            end
          end

          data = { row: row, column: column, day: date.day, month: date.month, year: date.year }
          data[:lessons] = [] if lessons.present?

          data[:lessons_count] = lessons.count

          lessons.each_with_index do |lesson, ind|
            data[:lessons] << {
              id: ind,
              name: lesson.name,
              description: lesson.description,
              start_time: lesson.start_time.strftime("%H:%M"),
              end_time: lesson.end_time.strftime("%H:%M"),
              lesson_room: lesson.lesson_room.present? ? lesson.lesson_room.name : ""
            }
          end

          arr[row] << data

          if ind == end_date.day - 1
            ((column + 1)..6).each do |col|
              arr[row] << { row: row, column: col, day: col - column, month: (date + 1.month).month, year: (date + 1.month).year }
            end
          end
        end

        render json: json.values, status: 200
      rescue StandardError => e
        render_404 e.to_s
      end

      # GET /schedule_kun/teachers/calendars/week
      def week
        raise DateNotFoundError if params[:year].blank? || params[:month].blank? || params[:day].blank?

        year = params[:year]
        month = params[:month]
        day = params[:day]

        start_date = Time.zone.parse("#{year}/#{month}/#{day}").beginning_of_week
        end_date = start_date.end_of_week

        all_lessons = current_teacher.lessons.enabled.between_date(start_date, end_date).order(:start_time)

        json = (Date.parse(start_date.to_s)..Date.parse(end_date.to_s)).each_with_object([]).with_index do |(date, arr), ind|
          lessons = all_lessons.select { |l| Date.parse(l.start_time.to_s) == date }

          data = { column: ind, day: date.day, month: date.month, year: date.year }
          data[:lessons] = [] if lessons.present?

          lessons.each do |lesson|
            data[:lessons] << {
              name: lesson.name,
              description: lesson.description,
              start_time: lesson.start_time.strftime("%H:%M"),
              end_time: lesson.end_time.strftime("%H:%M"),
              lesson_room: lesson.lesson_room.present? ? lesson.lesson_room.name : ""
            }
          end

          arr << data
        end

        render json: json, status: 200
      rescue StandardError => e
        render_404 e.to_s
      end
    end
  end
end
