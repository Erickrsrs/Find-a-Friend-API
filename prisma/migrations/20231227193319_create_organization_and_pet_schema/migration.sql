-- CreateEnum
CREATE TYPE "Age" AS ENUM ('BABY', 'ADULT', 'SENIOR');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('TINY', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('LOW', 'MODERATE', 'HIGH');

-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('DEPENDENT', 'INDEPENDENT', 'SELF_SUFFICIENT');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "race" TEXT,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "energy" "Energy" NOT NULL,
    "independence_level" "IndependenceLevel" NOT NULL,
    "requirements" TEXT[],
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manager_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
