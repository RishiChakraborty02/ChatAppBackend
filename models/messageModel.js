const messageTable = `CREATE TABLE IF NOT EXISTS messages(
message_id UUID PRIMARY KEY,
sent_by UUID NOT NULL,
received_by UUID NOT NULL,
message_status INT NOT NULL,
message_content TEXT NOT NULL
);
`;

export default messageTable;
