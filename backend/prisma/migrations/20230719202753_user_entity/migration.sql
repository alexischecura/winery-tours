-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'GUIDE', 'LEAD_GUIDE', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "photo" TEXT DEFAULT 'default-user.jpg',
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL,
    "verified" BOOLEAN DEFAULT false,
    "verificationCode" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wineries" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "imageCover" TEXT NOT NULL,
    "images" TEXT[],
    "address" TEXT NOT NULL,
    "coordinates" DOUBLE PRECISION[],

    CONSTRAINT "wineries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tours" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "duration" INTEGER NOT NULL,
    "maxGroupSize" INTEGER NOT NULL,
    "ratingsAverage" DOUBLE PRECISION NOT NULL DEFAULT 4.5,
    "ratingsQuantity" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL,
    "priceDiscount" INTEGER NOT NULL DEFAULT 0,
    "summary" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "imageCover" TEXT NOT NULL,
    "startDates" TIMESTAMP(3)[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_events" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "specialEvent" BOOLEAN NOT NULL DEFAULT false,
    "tourId" TEXT NOT NULL,
    "wineryId" TEXT NOT NULL,

    CONSTRAINT "tour_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TourToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "users_email_verificationCode_idx" ON "users"("email", "verificationCode");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_verificationCode_key" ON "users"("email", "verificationCode");

-- CreateIndex
CREATE UNIQUE INDEX "_TourToUser_AB_unique" ON "_TourToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TourToUser_B_index" ON "_TourToUser"("B");

-- AddForeignKey
ALTER TABLE "tour_events" ADD CONSTRAINT "tour_events_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_events" ADD CONSTRAINT "tour_events_wineryId_fkey" FOREIGN KEY ("wineryId") REFERENCES "wineries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TourToUser" ADD CONSTRAINT "_TourToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TourToUser" ADD CONSTRAINT "_TourToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
