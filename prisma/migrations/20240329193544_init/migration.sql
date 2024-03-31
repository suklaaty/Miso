-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255),
    "password" VARCHAR(60) NOT NULL,
    "role" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "publicId" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3),

    CONSTRAINT "website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website_event" (
    "id" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "params" TEXT,
    "referrer" TEXT,
    "fingerprint" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "device" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "language" TEXT,
    "countryIso" TEXT,
    "countryName" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "website_event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "website_id_key" ON "website"("id");

-- CreateIndex
CREATE UNIQUE INDEX "website_publicId_key" ON "website"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "website_userId_domain_key" ON "website"("userId", "domain");

-- CreateIndex
CREATE UNIQUE INDEX "website_event_id_key" ON "website_event"("id");

-- Add default admin account
INSERT INTO "user"("id", "email", "password", "role", "status") VALUES ('OjGoscnlXvVyFaFjwY2q6ScF' , 'admin@admin.com', '$2b$10$VRBV0DrIJQCP4oAtroLhTu6oBDGvoqgXGKEk9EklJbcBTr8WSj0cC', 1, 1);