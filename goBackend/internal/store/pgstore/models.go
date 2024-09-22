// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package pgstore

import (
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type Message struct {
	ID             uuid.UUID
	RoomID         uuid.UUID
	Message        string
	ReactionCount  int64
	Answered       bool
	AnswearMessage pgtype.Text
}

type Room struct {
	ID    uuid.UUID
	Theme string
}
