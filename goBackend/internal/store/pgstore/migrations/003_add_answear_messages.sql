-- Write your migrate up statements here
ALTER TABLE messages
ADD COLUMN answear_message VARCHAR(255);

---- create above / drop below ----

-- Write your migrate down statements here. If this migration is irreversible
-- Then delete the separator line above.
ALTER TABLE message
DROP COLUMN answear_message;
