class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  private

    def default_client_attributes
      attributes.symbolize_keys.except(
        :deleted_at,
        :deleter_id,
        :deleter_type,
        :created_at,
        :updated_at,
      )
    end
end
