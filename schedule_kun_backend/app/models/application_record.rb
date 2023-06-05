class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  scope :enabled, -> { where(delf: 0) }
  scope :deleted, -> { where(delf: 1) }

  def delete_update(account)
    with_associations(:delete_update_wqith_no_associations, account)
  end

  protected

  def with_associations(callback, account)
    child_tables = self.class.included_tables
    childs = child_tables.map do |child_table|
      self.send(child_table)
    end.flatten

    childs.compact.each { |child| child.with_associations(callback, account) }

    send(callback, account)
  end

  private

  def default_client_attributes
    attributes.symbolize_keys.except(
      :delf,
      :deleted_at,
      :deleted_account_id,
      :deleted_account_type,
      :created_at,
      :updated_at,
    )
  end

  def delete_update_wqith_no_associations(account)
    update!(
      delf: 1,
      deleted_account_type: case account.class.to_s
        when "Teacher"
          0
        when "Student"
          1
        when "Guardian"
          2
        else
          0
        end,
      deleted_account_id: account.id,
      deleted_at: Time.zone.now
    )
  end

  class << self
    def included_tables
      result = %i[has_many has_one].map { |a| self.reflect_on_all_associations(a) }.flatten.filter_map do |i|
        next unless %i[destroy delete delete_all].include?(i.options[:dependent]) && i.options.keys.exclude?(:through)

        i.options[:class_name]&.underscore&.pluralize&.to_sym || i.name
      end.compact
      result
    end
  end
end
