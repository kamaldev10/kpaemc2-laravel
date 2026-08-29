## Entity Relationship Diagram (ERD) — KPA EMC² Web Portal

> **Arsitektur Taksonomi & Relasi Terpadu:**
>
> - **Total 12 Tabel:** Taksonomi `categories` mengklasifikasikan `posts`, `events`, dan `galleries`.
> - **Relasi Divisi Opsional:** `divisions` berelasi opsional (0..*) ke `members`, `posts`, `events`, dan `galleries`.
> - **Audit Log:** Seluruh entitas memiliki 5 kolom audit log (`is_active`, `created_by`, `updated_by`, `created_at`, `updated_at`).
> - **Zero-BLOB:** Seluruh aset media hanya menyimpan `*_url` dan `*_public_id` dari Cloudinary.

```mermaid
erDiagram
    USERS ||--o{ POSTS : "authors"
    USERS ||--o{ EVENTS : "creates"

    DIVISIONS ||--o{ MEMBERS : "has"
    DIVISIONS ||--o{ POSTS : "organizes"
    DIVISIONS ||--o{ EVENTS : "holds"
    DIVISIONS ||--o{ GALLERIES : "owns"

    CATEGORIES ||--o{ POSTS : "classifies"
    CATEGORIES ||--o{ EVENTS : "categorizes"
    CATEGORIES ||--o{ GALLERIES : "groups"

    GALLERIES ||--|{ GALLERY_ITEMS : "contains"

    EVENTS ||--o{ REGISTRATIONS : "receives"

    ABOUT_INFOS {
        smallint id PK
        varchar org_name
        varchar founded_date
        varchar motto
        text description
        text vision
        jsonb mission
        varchar active_term
        jsonb org_structure
        varchar logo_url
        varchar logo_public_id
        varchar cover_url
        varchar cover_public_id
        boolean is_active
        bigint created_by FK
        bigint updated_by FK
        timestamptz created_at
        timestamptz updated_at
    }

    USERS {
        bigint id PK
        varchar name
        varchar email UK
        varchar role
        varchar password
        varchar avatar_url
        varchar avatar_public_id
        boolean is_active
        bigint created_by FK
        bigint updated_by FK
        timestamptz email_verified_at
        timestamptz created_at
        timestamptz updated_at
    }

    DIVISIONS {
        smallint id PK
        varchar slug UK
        varchar name
        varchar icon_name
        varchar cover_url
        varchar cover_public_id
        varchar short_description
        text full_description
        jsonb study_materials
        jsonb equipment
        smallint sort_order
        boolean is_active
        bigint created_by FK
        bigint updated_by FK
        timestamptz created_at
        timestamptz updated_at
    }

    MEMBERS {
        bigint id PK
        varchar member_number UK
        varchar name
        smallint division_id FK
        varchar position
        smallint batch_year
        varchar major
        varchar phone
        varchar email
        varchar status
        text bio
        varchar avatar_url
        varchar avatar_public_id
        boolean is_visible
        integer sort_order
        boolean is_active
        bigint created_by FK
        bigint updated_by FK
        timestamptz created_at
        timestamptz updated_at
        timestamptz deleted_at
    }

    CATEGORIES {
        bigint id PK
        varchar slug UK
        varchar name
        varchar type
        varchar color
        smallint sort_order
        boolean is_active
        bigint created_by FK
        bigint updated_by FK
        timestamptz created_at
        timestamptz updated_at
    }

    POSTS {
        bigint id PK
        bigint user_id FK
        bigint category_id FK
        smallint division_id FK
        varchar title
        varchar slug UK
        text excerpt
        text content
        varchar content_source
        varchar cover_image_url
        varchar cover_image_public_id
        varchar cover_image_source
        varchar author_name
        jsonb tags
        boolean is_featured
        boolean is_published
        timestamptz published_at
        timestamptz post_date
        boolean is_active
        bigint created_by FK
        bigint updated_by FK
        timestamptz created_at
        timestamptz updated_at
        timestamptz deleted_at
    }

    GALLERIES {
        bigint id PK
        smallint division_id FK
        bigint category_id FK
        varchar title
        text description
        varchar cover_url
        varchar cover_public_id
        date event_date
        varchar location
        boolean is_published
        integer sort_order
        boolean is_active
        bigint created_by FK
        bigint updated_by FK
        timestamptz created_at
        timestamptz updated_at
        timestamptz deleted_at
    }

    GALLERY_ITEMS {
        bigint id PK
        bigint gallery_id FK
        varchar cloudinary_public_id
        varchar url
        varchar type
        varchar caption
        integer width
        integer height
        integer sort_order
        boolean is_active
        bigint created_by FK
        bigint updated_by FK
        timestamptz created_at
        timestamptz updated_at
        timestamptz deleted_at
    }

    EVENTS {
        bigint id PK
        varchar slug UK
        bigint category_id FK
        smallint division_id FK
        varchar title
        varchar type
        text description
        varchar cover_url
        varchar cover_public_id
        varchar location
        timestamptz start_date
        timestamptz end_date
        timestamptz registration_open_at
        timestamptz registration_close_at
        integer max_participants
        boolean requires_payment
        numeric payment_amount
        jsonb form_fields
        jsonb tags
        boolean is_published
        boolean is_active
        bigint created_by FK
        bigint updated_by FK
        timestamptz created_at
        timestamptz updated_at
    }

    REGISTRATIONS {
        bigint id PK
        bigint event_id FK
        varchar registration_code UK
        varchar full_name
        varchar email
        varchar phone
        varchar gender
        date birth_date
        varchar place_of_birth
        text address
        varchar institution
        varchar major
        varchar occupation
        text motivation
        varchar photo_url
        varchar photo_public_id
        varchar document_url
        varchar document_public_id
        jsonb extra_data
        varchar payment_proof_url
        varchar payment_proof_public_id
        varchar status
        text reviewer_notes
        boolean is_active
        bigint created_by FK
        bigint updated_by FK
        timestamptz created_at
        timestamptz updated_at
    }

    CONTACTS {
        bigint id PK
        varchar name
        varchar email
        varchar subject
        text message
        boolean is_read
        inet ip_address
        boolean is_active
        bigint created_by FK
        bigint updated_by FK
        timestamptz created_at
        timestamptz updated_at
    }

    SITE_SETTINGS {
        bigint id PK
        varchar key UK
        text value
        varchar group
        varchar description
        boolean is_active
        bigint created_by FK
        bigint updated_by FK
        timestamptz created_at
        timestamptz updated_at
    }
```
