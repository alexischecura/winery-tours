// model Review {
//   id      String @id @default(cuid())
//   rating  Float
//   comment String

//   tourId String
//   tour   Tour   @relation(fields: [tourId], references: [id])
//   userId String
//   user   User   @relation(fields: [userId], references: [id])

//   createdAt DateTime @default(now()) @map("created_at")

//   @@map("reviews")
// }
