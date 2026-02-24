PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "subscriptionStatus" TEXT NOT NULL DEFAULT 'FREE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizationId" TEXT, emailVerified DATETIME, needsPasswordChange INTEGER NOT NULL DEFAULT 0, image TEXT,
    CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO User VALUES('cmlxhoemb0011yzunsnfy4xbk','Super Admin','admin@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ADMIN','FREE',1771749115138,NULL,'2026-02-22 15:49:10',0,NULL);
INSERT INTO User VALUES('cmlxhoemo0014yzunx93ymhv7','Raj Mehta (Owner)','owner@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE',1771749115152,'cm3m3i0a5miq1emoanqywm5wu','2026-02-22 15:49:10',0,NULL);
INSERT INTO User VALUES('cmlxhoemp0016yzunlhujp5b1','Priya Sharma (Teacher)','teacher@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE',1771749115153,'cm3m3i0a5miq1emoanqywm5wu','2026-02-22 15:49:10',0,NULL);
INSERT INTO User VALUES('cmlxhoemq0019yzun3mfl7ny2','Normal User','user@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE',1771749115155,NULL,'2026-02-22 15:49:10',0,NULL);
INSERT INTO User VALUES('cmzr0vkg0578f23n2atoyny2b','Owner 1 (Org 1)','owner1_org1@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu',NULL,0,NULL);
INSERT INTO User VALUES('cm6vvq5aw81hmxoj2lh9nx901','Teacher 2 (Org 1)','teacher2_org1@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu',NULL,0,NULL);
INSERT INTO User VALUES('cmo2ik1ffwckjvdz29dfn3h9l','Teacher 3 (Org 1)','teacher3_org1@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu',NULL,0,NULL);
INSERT INTO User VALUES('cm2dimnxvylue5ndl6gs4dfoz','Student 1 (Org 1)','student1_org1@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu',NULL,0,NULL);
INSERT INTO User VALUES('cmmdl78hhhve3hsfnhbu88ktk','Student 2 (Org 1)','student2_org1@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu',NULL,0,NULL);
INSERT INTO User VALUES('cmohhxn1gud3loayfnsswstb2','Owner 1 (Org 2)','owner1_org2@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6',NULL,0,NULL);
INSERT INTO User VALUES('cmw6p5et63hm5gjp1a0fswz7k','Owner 2 (Org 2)','owner2_org2@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6',NULL,0,NULL);
INSERT INTO User VALUES('cmy8crg0m2ylafci6hfg3gt5o','Teacher 1 (Org 2)','teacher1_org2@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6',NULL,0,NULL);
INSERT INTO User VALUES('cmh12m7wyd3zspzc8pf5btpzz','Teacher 2 (Org 2)','teacher2_org2@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6',NULL,0,NULL);
INSERT INTO User VALUES('cm1n5ls4xr8ivfx68tm7t25x5','Teacher 3 (Org 2)','teacher3_org2@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6',NULL,0,NULL);
INSERT INTO User VALUES('cm70sq4o6rtgh6xjy58kxz3kt','Student 1 (Org 2)','student1_org2@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6',NULL,0,NULL);
INSERT INTO User VALUES('cm82r4w2ny7cf4kui646kg0na','Student 2 (Org 2)','student2_org2@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6',NULL,0,NULL);
INSERT INTO User VALUES('cm7am4698gtktrzmsm8p5oaau','Owner 1 (Org 3)','owner1_org3@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6',NULL,0,NULL);
INSERT INTO User VALUES('cm1jj1r8nlmb6rnijx6tq3r9w','Owner 2 (Org 3)','owner2_org3@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6',NULL,0,NULL);
INSERT INTO User VALUES('cm44wnzjt8c5xofn45s8qkzsv','Teacher 1 (Org 3)','teacher1_org3@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6',NULL,0,NULL);
INSERT INTO User VALUES('cmpz0r7v8zbq9k8ve60gddgot','Teacher 2 (Org 3)','teacher2_org3@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6',NULL,0,NULL);
INSERT INTO User VALUES('cmcjl2mjejbaveid21cur558z','Teacher 3 (Org 3)','teacher3_org3@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6',NULL,0,NULL);
INSERT INTO User VALUES('cm5crt2kznhsyjm3hcxzryiln','Student 1 (Org 3)','student1_org3@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6',NULL,0,NULL);
INSERT INTO User VALUES('cmsl38xyn7buepyikscuhcc1d','Student 2 (Org 3)','student2_org3@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6',NULL,0,NULL);
INSERT INTO User VALUES('cmhpqb883iykqc1j0u6125hrw','Owner 1 (Org 4)','owner1_org4@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q',NULL,0,NULL);
INSERT INTO User VALUES('cmvxdw2q2mud0dot3muhaynz0','Owner 2 (Org 4)','owner2_org4@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q',NULL,0,NULL);
INSERT INTO User VALUES('cmtzgvuyaifz567nbves03nwt','Teacher 1 (Org 4)','teacher1_org4@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q',NULL,0,NULL);
INSERT INTO User VALUES('cm7eayashujgrpe9ftkxh8tnr','Teacher 2 (Org 4)','teacher2_org4@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q',NULL,0,NULL);
INSERT INTO User VALUES('cmrzv583n0jq931u6xguchg3a','Teacher 3 (Org 4)','teacher3_org4@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q',NULL,0,NULL);
INSERT INTO User VALUES('cmy1ojefbr75quj55www0bn9q','Student 1 (Org 4)','student1_org4@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q',NULL,0,NULL);
INSERT INTO User VALUES('cmwfrau3kns8m03qf3r1m1itf','Student 2 (Org 4)','student2_org4@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q',NULL,0,NULL);
INSERT INTO User VALUES('cmh16piggboyxxet5y9z47cp9','Owner 1 (Org 5)','owner1_org5@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8',NULL,0,NULL);
INSERT INTO User VALUES('cmwwmkjp6ds7nsjj5syps8w1s','Owner 2 (Org 5)','owner2_org5@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8',NULL,0,NULL);
INSERT INTO User VALUES('cma0i6zdp15ez34vzfozwhu2q','Teacher 1 (Org 5)','teacher1_org5@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8',NULL,0,NULL);
INSERT INTO User VALUES('cmamb1fpe501vj9q7iv5dxusx','Teacher 2 (Org 5)','teacher2_org5@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8',NULL,0,NULL);
INSERT INTO User VALUES('cmpy8d1csdjcsahvp44yfa0gw','Teacher 3 (Org 5)','teacher3_org5@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8',NULL,0,NULL);
INSERT INTO User VALUES('cmkmnddxuwz1d1ji6tn5zvv7m','Student 1 (Org 5)','student1_org5@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8',NULL,0,NULL);
INSERT INTO User VALUES('cm1x6xbbnfqy4qeaf4jhks75m','Student 2 (Org 5)','student2_org5@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8',NULL,0,NULL);
INSERT INTO User VALUES('cmf9x99fvxoqbru73688yldby','Owner 1 (Org 6)','owner1_org6@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a',NULL,0,NULL);
INSERT INTO User VALUES('cmfqjxzd2eobkq4st0ptcw8v9','Owner 2 (Org 6)','owner2_org6@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a',NULL,0,NULL);
INSERT INTO User VALUES('cmthf6kfsldjmuzhvks4pzcod','Teacher 1 (Org 6)','teacher1_org6@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a',NULL,0,NULL);
INSERT INTO User VALUES('cmewp0k5rqnke68x9i1i8ii8k','Teacher 2 (Org 6)','teacher2_org6@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a',NULL,0,NULL);
INSERT INTO User VALUES('cm8hqazw5ffx1cyonwjf176g4','Teacher 3 (Org 6)','teacher3_org6@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a',NULL,0,NULL);
INSERT INTO User VALUES('cmaqfjlcbl8vbf839mb464ryl','Student 1 (Org 6)','student1_org6@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a',NULL,0,NULL);
INSERT INTO User VALUES('cmklgobl28s67t74eruyix476','Student 2 (Org 6)','student2_org6@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a',NULL,0,NULL);
INSERT INTO User VALUES('cmlihfat6kcks1b37ko9ehq60','Owner 1 (Org 7)','owner1_org7@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9',NULL,0,NULL);
INSERT INTO User VALUES('cm291508fs8njztr6u33zyoxt','Owner 2 (Org 7)','owner2_org7@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9',NULL,0,NULL);
INSERT INTO User VALUES('cmrfwiavjw2xwuc67xdtsqn4t','Teacher 1 (Org 7)','teacher1_org7@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9',NULL,0,NULL);
INSERT INTO User VALUES('cm80nj84z8su2wxloddjki3af','Teacher 2 (Org 7)','teacher2_org7@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9',NULL,0,NULL);
INSERT INTO User VALUES('cmxoyp6ql16t74gs5ntmibby1','Teacher 3 (Org 7)','teacher3_org7@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9',NULL,0,NULL);
INSERT INTO User VALUES('cmop1i300e527y5e2t2lyppdf','Student 1 (Org 7)','student1_org7@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9',NULL,0,NULL);
INSERT INTO User VALUES('cm9ij2rczme1igpq2r48f63li','Student 2 (Org 7)','student2_org7@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9',NULL,0,NULL);
INSERT INTO User VALUES('cmn0ygsu5t7rj47engii8u2oe','Owner 1 (Org 8)','owner1_org8@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn',NULL,0,NULL);
INSERT INTO User VALUES('cmvzceh41nm3cawrvf25veck7','Owner 2 (Org 8)','owner2_org8@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn',NULL,0,NULL);
INSERT INTO User VALUES('cmmrh500ix6icsp4b22j72ld4','Teacher 1 (Org 8)','teacher1_org8@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn',NULL,0,NULL);
INSERT INTO User VALUES('cmwxqmiulp7imk3ujuwjrzpx2','Teacher 2 (Org 8)','teacher2_org8@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn',NULL,0,NULL);
INSERT INTO User VALUES('cmhq9tdv7omabawdq6arxzrlk','Teacher 3 (Org 8)','teacher3_org8@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn',NULL,0,NULL);
INSERT INTO User VALUES('cm4bl5z35cq7ychkebuv86hk8','Student 1 (Org 8)','student1_org8@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn',NULL,0,NULL);
INSERT INTO User VALUES('cm4bewzs243z42zxmx29swi53','Student 2 (Org 8)','student2_org8@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn',NULL,0,NULL);
INSERT INTO User VALUES('cmquya7a2xvgh5uztuu2v2553','Owner 1 (Org 9)','owner1_org9@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi',NULL,0,NULL);
INSERT INTO User VALUES('cmyoudhz4i7yscwiiipzcowgq','Owner 2 (Org 9)','owner2_org9@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi',NULL,0,NULL);
INSERT INTO User VALUES('cmwfd2npf84m7atd967l4z4q2','Teacher 1 (Org 9)','teacher1_org9@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi',NULL,0,NULL);
INSERT INTO User VALUES('cmywa5c36bbxjfiirek5nrqnk','Teacher 2 (Org 9)','teacher2_org9@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi',NULL,0,NULL);
INSERT INTO User VALUES('cm333dnd6ir4ubitcc6u0kssx','Teacher 3 (Org 9)','teacher3_org9@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi',NULL,0,NULL);
INSERT INTO User VALUES('cmr9c1mulknnfrkoqbppk93m1','Student 1 (Org 9)','student1_org9@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi',NULL,0,NULL);
INSERT INTO User VALUES('cmm052e222qfcnnflc0plr5mx','Student 2 (Org 9)','student2_org9@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi',NULL,0,NULL);
INSERT INTO User VALUES('cm7de5yow4jobsts64xelc82u','Owner 1 (Org 10)','owner1_org10@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p',NULL,0,NULL);
INSERT INTO User VALUES('cm7tng7po1xppn23lurnzh6gl','Owner 2 (Org 10)','owner2_org10@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','ORG_OWNER','FREE','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p',NULL,0,NULL);
INSERT INTO User VALUES('cmbkt0urpuxu9ea54so1wcsqg','Teacher 1 (Org 10)','teacher1_org10@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p',NULL,0,NULL);
INSERT INTO User VALUES('cmfq9d1jzexz4qnq01kgcwnge','Teacher 2 (Org 10)','teacher2_org10@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p',NULL,0,NULL);
INSERT INTO User VALUES('cmql3zm8jmc75yvoxu2q8u6ec','Teacher 3 (Org 10)','teacher3_org10@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','TEACHER','FREE','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p',NULL,0,NULL);
INSERT INTO User VALUES('cm4tt0h1k2dyguec45lcyjl3o','Student 1 (Org 10)','student1_org10@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p',NULL,0,NULL);
INSERT INTO User VALUES('cm10oh566uhyknik98452oqlr','Student 2 (Org 10)','student2_org10@demo.com','$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6','USER','FREE','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p',NULL,0,NULL);
CREATE TABLE IF NOT EXISTS "Organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "contactName" TEXT,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'FREE',
    "maxSeats" INTEGER NOT NULL DEFAULT 50,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO Organization VALUES('cm3m3i0a5miq1emoanqywm5wu','Organization 1',NULL,NULL,'contact@org1.demo.com',NULL,'ENTERPRISE',50,'ACTIVE',NULL,'2026-02-22 18:51:06','2026-02-22 18:51:06');
INSERT INTO Organization VALUES('cm5eyggsuc6d9heg61opqo1b6','Organization 2',NULL,NULL,'contact@org2.demo.com',NULL,'ENTERPRISE',50,'ACTIVE',NULL,'2026-02-22 18:51:06','2026-02-22 18:51:06');
INSERT INTO Organization VALUES('cm3iw4rca22bnpi38ln2pvuu6','Organization 3',NULL,NULL,'contact@org3.demo.com',NULL,'FREE',50,'ACTIVE',NULL,'2026-02-22 18:51:06','2026-02-22 18:51:06');
INSERT INTO Organization VALUES('cmuhb7wqt9e4w76zu447edu8q','Organization 4',NULL,NULL,'contact@org4.demo.com',NULL,'ENTERPRISE',50,'ACTIVE',NULL,'2026-02-22 18:51:06','2026-02-22 18:51:06');
INSERT INTO Organization VALUES('cmohapm51zcnf318y7wndm4f8','Organization 5',NULL,NULL,'contact@org5.demo.com',NULL,'FREE',50,'ACTIVE',NULL,'2026-02-22 18:51:06','2026-02-22 18:51:06');
INSERT INTO Organization VALUES('cmrc9ky8q81oqyl05rd9co30a','Organization 6',NULL,NULL,'contact@org6.demo.com',NULL,'ENTERPRISE',50,'ACTIVE',NULL,'2026-02-22 18:51:06','2026-02-22 18:51:06');
INSERT INTO Organization VALUES('cmcpuo3xtr6u1imvvfwm5adz9','Organization 7',NULL,NULL,'contact@org7.demo.com',NULL,'STANDARD',50,'ACTIVE',NULL,'2026-02-22 18:51:06','2026-02-22 18:51:06');
INSERT INTO Organization VALUES('cmeoopjwa0tuorfsbcnmzd0sn','Organization 8',NULL,NULL,'contact@org8.demo.com',NULL,'ENTERPRISE',50,'ACTIVE',NULL,'2026-02-22 18:51:06','2026-02-22 18:51:06');
INSERT INTO Organization VALUES('cmvrnrejeleylqwfz73md6bmi','Organization 9',NULL,NULL,'contact@org9.demo.com',NULL,'ENTERPRISE',50,'ACTIVE',NULL,'2026-02-22 18:51:06','2026-02-22 18:51:06');
INSERT INTO Organization VALUES('cmxi886z0xd3rll6qdtxwwi5p','Organization 10',NULL,NULL,'contact@org10.demo.com',NULL,'FREE',50,'ACTIVE',NULL,'2026-02-22 18:51:06','2026-02-22 18:51:06');
CREATE TABLE IF NOT EXISTS "Badge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "awardedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Badge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "textHi" TEXT,
    "options" TEXT NOT NULL,
    "correctOptionIndex" INTEGER NOT NULL,
    "explanation" TEXT,
    "explanationHi" TEXT,
    "subject" TEXT NOT NULL,
    "topic" TEXT,
    "difficulty" TEXT NOT NULL DEFAULT 'MEDIUM',
    "examType" TEXT NOT NULL,
    "year" INTEGER,
    "imageUrl" TEXT,
    "imageWidth" INTEGER,
    "imageHeight" INTEGER,
    "tags" TEXT,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "questionType" TEXT NOT NULL DEFAULT 'MCQ',
    "metadata" TEXT,
    "solveAttemptCount" INTEGER NOT NULL DEFAULT 0,
    "wrongAttemptCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizationId" TEXT,
    "createdById" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "category" TEXT NOT NULL DEFAULT 'BOTH',
    CONSTRAINT "Question_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Question_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO Question VALUES('PYQ_2023_T1_01','A number is first increased by 20% and then decreased by 20%. The number effectively:','एक संख्या को पहले 20% बढ़ाया जाता है और फिर 20% घटाया जाता है। संख्या में प्रभावी रूप से:','["Does not change","Decreases by 4%","Increases by 4%","Decreases by 0.4%"]',1,'x + y + xy/100 -> 20 - 20 - 400/100 = -4%',NULL,'Math','Percentage','EASY','SSC CGL Tier 1',2023,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 16:36:46','2026-02-22 16:36:46',NULL,NULL,1,'BOTH');
INSERT INTO Question VALUES('PYQ_2022_T1_05','If A is 40% more than B, then B is how much percent less than A?','यदि A, B से 40% अधिक है, तो B, A से कितना प्रतिशत कम है?','["28.57%","40%","33.33%","25%"]',0,'1/5 -> 2/5 more -> 2/7 less. 2/7 = 28.57%',NULL,'Math','Percentage','EASY','SSC CGL Tier 1',2022,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 16:36:46','2026-02-22 16:36:46',NULL,NULL,1,'BOTH');
INSERT INTO Question VALUES('PYQ_2023_T2_02','A shopkeeper earns a profit of 20% even after offering a discount of 10% on the MP. Find the ratio of CP to MP.','एक दुकानदार अंकित मूल्य पर 10% की छूट देने के बाद भी 20% का लाभ कमाता है। क्रय मूल्य और अंकित मूल्य का अनुपात ज्ञात करें।','["3:4","4:5","2:3","9:8"]',0,'CP/MP = (100-D)/(100+P) = 90/120 = 3/4',NULL,'Math','Profit & Loss','MEDIUM','SSC CGL Tier 2',2023,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 16:36:46','2026-02-22 16:36:46',NULL,NULL,1,'BOTH');
INSERT INTO Question VALUES('PYQ_2022_T1_12','By selling an article for ₹500, a man incurs a loss of 10%. At what price should he sell it to gain 20%?','एक वस्तु को ₹500 में बेचने पर एक आदमी को 10% की हानि होती है। 20% लाभ कमाने के लिए उसे किस कीमत पर बेचना चाहिए?','["₹600","₹666.66","₹700","₹550"]',1,'SP2 = SP1 * (120/90) = 500 * 4/3 = 2000/3',NULL,'Math','Profit & Loss','EASY','SSC CGL Tier 1',2022,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 16:36:46','2026-02-22 16:36:46',NULL,NULL,1,'BOTH');
INSERT INTO Question VALUES('PYQ_2023_T1_08','If x + 1/x = 4, then find the value of x² + 1/x².','यदि x + 1/x = 4, तो x² + 1/x² का मान ज्ञात करें।','["16","14","12","18"]',1,'k² - 2 -> 4² - 2 = 14',NULL,'Math','Algebra','EASY','SSC CGL Tier 1',2023,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 16:36:46','2026-02-22 16:36:46',NULL,NULL,1,'BOTH');
INSERT INTO Question VALUES('PYQ_2022_T2_03','If x + 1/x = √3, find the value of x¹⁸ + x¹² + x⁶ + 1.','यदि x + 1/x = √3, तो x¹⁸ + x¹² + x⁶ + 1 का मान ज्ञात करें।','["0","1","2","-1"]',0,'x⁶ = -1. Pairs sum to 0.',NULL,'Math','Algebra','MEDIUM','SSC CGL Tier 2',2022,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 16:36:46','2026-02-22 16:36:46',NULL,NULL,1,'BOTH');
INSERT INTO Question VALUES('PYQ_2023_T1_15','Find the unit digit of (23)⁵⁷.','(23)⁵⁷ का इकाई अंक ज्ञात करें।','["3","7","9","1"]',0,'57/4 rem 1. 3¹ = 3',NULL,'Math','Number System','EASY','SSC CGL Tier 1',2023,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 16:36:46','2026-02-22 16:36:46',NULL,NULL,1,'BOTH');
INSERT INTO Question VALUES('PYQ_2022_T1_18','The number 5432x7 is divisible by 9. Find the digit x.','संख्या 5432x7, 9 से विभाज्य है। अंक x ज्ञात करें।','["0","6","1","9"]',1,'Sum of digits must be div by 9. 21+x -> x=6',NULL,'Math','Number System','EASY','SSC CGL Tier 1',2022,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 16:36:46','2026-02-22 16:36:46',NULL,NULL,1,'BOTH');
INSERT INTO Question VALUES('PYQ_2023_T2_05','Find the value of tan 10° tan 20° tan 70° tan 80°.','tan 10° tan 20° tan 70° tan 80° का मान ज्ञात करें।','["0","1","√3","1/√3"]',1,'Pairs matching 90 cancel out to 1',NULL,'Math','Trigonometry','EASY','SSC CGL Tier 2',2023,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 16:36:46','2026-02-22 16:36:46',NULL,NULL,1,'BOTH');
INSERT INTO Question VALUES('PYQ_2022_T1_22','A policeman sees a thief at 200m. Police starts chasing. Police speed 12km/h, Thief 10km/h. Distance thief runs before caught?','एक पुलिसकर्मी 200 मीटर की दूरी पर चोर को देखता है और पीछा करना शुरू करता है। पुलिस की गति 12 किमी/घंटा और चोर की 10 किमी/घंटा है। पकड़े जाने से पहले चोर कितनी दूरी तय करेगा?','["1km","2km","1.5km","800m"]',0,'Relative speed 2kmph. Time = 0.2/2 = 0.1hr. Thief Dist = 10 * 0.1 = 1km',NULL,'Math','Time Speed Distance','MEDIUM','SSC CGL Tier 1',2022,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 16:36:46','2026-02-22 16:36:46',NULL,NULL,1,'BOTH');
INSERT INTO Question VALUES('PYQ_2023_T1_20','A can do a work in 10 days, B in 15 days. They work together for 4 days then A leaves. In how many days will B finish remaining work?','A एक कार्य को 10 दिनों में और B 15 दिनों में कर सकता है। वे 4 दिनों तक एक साथ काम करते हैं फिर A छोड़ देता है। B शेष कार्य को कितने दिनों में पूरा करेगा?','["2 days","3 days","5 days","4 days"]',2,'LCM 30. Eff(A)=3, B=2. Total 5. 4 days=20 units. Left 10. B time = 10/2 = 5',NULL,'Math','Time & Work','MEDIUM','SSC CGL Tier 1',2023,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 16:36:46','2026-02-22 16:36:46',NULL,NULL,1,'BOTH');
INSERT INTO Question VALUES('cmly2z8n10003jxt1u5fne3g5','asdfbng','','[{"text":"ads"},{"text":"d"},{"text":"sdf"},{"text":"d"}]',0,'','','Mathematics','dsfg','HARD','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,1771784892537,1771785837902,NULL,'cmlxhoemo0014yzunx93ymhv7',1,'BOTH');
INSERT INTO Question VALUES('cmzv8vvetpvkujxnvtvs7neup','Question 1 for Org 1: What is 1 + 1?',NULL,'[{"text":"2"},{"text":"3"},{"text":"1"},{"text":"4"}]',0,NULL,NULL,'Reasoning','Syllogism','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cm6vvq5aw81hmxoj2lh9nx901',0,'BOTH');
INSERT INTO Question VALUES('cmt821wrq5qm2ddag13f43ebs','Question 2 for Org 1: What is 2 + 1?',NULL,'[{"text":"3"},{"text":"4"},{"text":"2"},{"text":"5"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cm6vvq5aw81hmxoj2lh9nx901',0,'BOTH');
INSERT INTO Question VALUES('cmigdsu70la2d7yt62a3q61zt','Question 3 for Org 1: What is 3 + 1?',NULL,'[{"text":"4"},{"text":"5"},{"text":"3"},{"text":"6"}]',0,NULL,NULL,'English','Comprehension','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu',NULL,0,'BOTH');
INSERT INTO Question VALUES('cmhmxpe564pest3mtf4lfn42a','Question 4 for Org 1: What is 4 + 1?',NULL,'[{"text":"5"},{"text":"6"},{"text":"4"},{"text":"7"}]',0,NULL,NULL,'English','Vocabulary','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cmo2ik1ffwckjvdz29dfn3h9l',0,'BOTH');
INSERT INTO Question VALUES('cmgy11s69aity9gilzn9yi5yv','Question 5 for Org 1: What is 5 + 1?',NULL,'[{"text":"6"},{"text":"7"},{"text":"5"},{"text":"8"}]',0,NULL,NULL,'English','Vocabulary','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cmo2ik1ffwckjvdz29dfn3h9l',0,'BOTH');
INSERT INTO Question VALUES('cmiu10qnay55ladmjr9cpb80g','Question 6 for Org 1: What is 6 + 1?',NULL,'[{"text":"7"},{"text":"8"},{"text":"6"},{"text":"9"}]',0,NULL,NULL,'Reasoning','Blood Relations','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu',NULL,0,'BOTH');
INSERT INTO Question VALUES('cmv1veczyby6ia2hg7dikel69','Question 7 for Org 1: What is 7 + 1?',NULL,'[{"text":"8"},{"text":"9"},{"text":"7"},{"text":"10"}]',0,NULL,NULL,'Reasoning','Coding-Decoding','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu',NULL,0,'BOTH');
INSERT INTO Question VALUES('cmet4ad8fo7v529cx0nwf93wb','Question 8 for Org 1: What is 8 + 1?',NULL,'[{"text":"9"},{"text":"10"},{"text":"8"},{"text":"11"}]',0,NULL,NULL,'Mathematics','Percentage','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cmo2ik1ffwckjvdz29dfn3h9l',0,'BOTH');
INSERT INTO Question VALUES('cmlnv3ogv3bqs60kd4xfrohgj','Question 9 for Org 1: What is 9 + 1?',NULL,'[{"text":"10"},{"text":"11"},{"text":"9"},{"text":"12"}]',0,NULL,NULL,'Reasoning','Blood Relations','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cm6vvq5aw81hmxoj2lh9nx901',0,'BOTH');
INSERT INTO Question VALUES('cmdghe7je7wy0pc0t3raf9pdk','Question 10 for Org 1: What is 10 + 1?',NULL,'[{"text":"11"},{"text":"12"},{"text":"10"},{"text":"13"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cm6vvq5aw81hmxoj2lh9nx901',0,'BOTH');
INSERT INTO Question VALUES('cmr4hcz0w3s2u03e594wiyaqk','Question 11 for Org 1: What is 11 + 1?',NULL,'[{"text":"12"},{"text":"13"},{"text":"11"},{"text":"14"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cm6vvq5aw81hmxoj2lh9nx901',0,'BOTH');
INSERT INTO Question VALUES('cmeygbhp934wslfhzamcoydxp','Question 12 for Org 1: What is 12 + 1?',NULL,'[{"text":"13"},{"text":"14"},{"text":"12"},{"text":"15"}]',0,NULL,NULL,'English','Synonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cm6vvq5aw81hmxoj2lh9nx901',0,'BOTH');
INSERT INTO Question VALUES('cmfm4b9gkewyixco8695otwdh','Question 13 for Org 1: What is 13 + 1?',NULL,'[{"text":"14"},{"text":"15"},{"text":"13"},{"text":"16"}]',0,NULL,NULL,'Mathematics','Profit & Loss','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cm6vvq5aw81hmxoj2lh9nx901',0,'BOTH');
INSERT INTO Question VALUES('cmfjg774tuled70capr12rzq1','Question 14 for Org 1: What is 14 + 1?',NULL,'[{"text":"15"},{"text":"16"},{"text":"14"},{"text":"17"}]',0,NULL,NULL,'Mathematics','Percentage','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu',NULL,0,'BOTH');
INSERT INTO Question VALUES('cmuryjbqokrdfgfxbnpm4a6kq','Question 15 for Org 1: What is 15 + 1?',NULL,'[{"text":"16"},{"text":"17"},{"text":"15"},{"text":"18"}]',0,NULL,NULL,'General Awareness','Polity','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu',NULL,0,'BOTH');
INSERT INTO Question VALUES('cm8zjbdysrtw1h4dj0xzbrcmf','Question 16 for Org 1: What is 16 + 1?',NULL,'[{"text":"17"},{"text":"18"},{"text":"16"},{"text":"19"}]',0,NULL,NULL,'Mathematics','Time & Work','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cm6vvq5aw81hmxoj2lh9nx901',0,'BOTH');
INSERT INTO Question VALUES('cmxutq6qmsorx8ooh9fbjgs9o','Question 17 for Org 1: What is 17 + 1?',NULL,'[{"text":"18"},{"text":"19"},{"text":"17"},{"text":"20"}]',0,NULL,NULL,'Mathematics','Trigonometry','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cmo2ik1ffwckjvdz29dfn3h9l',0,'BOTH');
INSERT INTO Question VALUES('cm63iuoohzuqj2te1qnnetajl','Question 18 for Org 1: What is 18 + 1?',NULL,'[{"text":"19"},{"text":"20"},{"text":"18"},{"text":"21"}]',0,NULL,NULL,'General Awareness','Polity','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cm6vvq5aw81hmxoj2lh9nx901',0,'BOTH');
INSERT INTO Question VALUES('cmv4mwictpnwgu8lsier14njv','Question 19 for Org 1: What is 19 + 1?',NULL,'[{"text":"20"},{"text":"21"},{"text":"19"},{"text":"22"}]',0,NULL,NULL,'Reasoning','Blood Relations','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cmo2ik1ffwckjvdz29dfn3h9l',0,'BOTH');
INSERT INTO Question VALUES('cmika4y1yowpzuodtygi0gb0a','Question 20 for Org 1: What is 20 + 1?',NULL,'[{"text":"21"},{"text":"22"},{"text":"20"},{"text":"23"}]',0,NULL,NULL,'Reasoning','Analogy','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu','cmo2ik1ffwckjvdz29dfn3h9l',0,'BOTH');
INSERT INTO Question VALUES('cmayeagv3khgwhgcc6kwapfa8','Question 1 for Org 2: What is 1 + 2?',NULL,'[{"text":"3"},{"text":"4"},{"text":"2"},{"text":"5"}]',0,NULL,NULL,'English','Antonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cmh12m7wyd3zspzc8pf5btpzz',0,'BOTH');
INSERT INTO Question VALUES('cmq488isi0zdygmgl1ttjtl2h','Question 2 for Org 2: What is 2 + 2?',NULL,'[{"text":"4"},{"text":"5"},{"text":"3"},{"text":"6"}]',0,NULL,NULL,'Reasoning','Syllogism','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cm1n5ls4xr8ivfx68tm7t25x5',0,'BOTH');
INSERT INTO Question VALUES('cmtdskju2wgbma1hgbpp6g93i','Question 3 for Org 2: What is 3 + 2?',NULL,'[{"text":"5"},{"text":"6"},{"text":"4"},{"text":"7"}]',0,NULL,NULL,'English','Vocabulary','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cm1n5ls4xr8ivfx68tm7t25x5',0,'BOTH');
INSERT INTO Question VALUES('cmn2g13e9zjevnfp199menah0','Question 4 for Org 2: What is 4 + 2?',NULL,'[{"text":"6"},{"text":"7"},{"text":"5"},{"text":"8"}]',0,NULL,NULL,'Mathematics','Percentage','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cmy8crg0m2ylafci6hfg3gt5o',0,'BOTH');
INSERT INTO Question VALUES('cmfebh2m4wq9hglclifhtdoiq','Question 5 for Org 2: What is 5 + 2?',NULL,'[{"text":"7"},{"text":"8"},{"text":"6"},{"text":"9"}]',0,NULL,NULL,'English','Synonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cm1n5ls4xr8ivfx68tm7t25x5',0,'BOTH');
INSERT INTO Question VALUES('cmrrj03z9dovzwkw7elbjhdi2','Question 6 for Org 2: What is 6 + 2?',NULL,'[{"text":"8"},{"text":"9"},{"text":"7"},{"text":"10"}]',0,NULL,NULL,'English','Vocabulary','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cmh12m7wyd3zspzc8pf5btpzz',0,'BOTH');
INSERT INTO Question VALUES('cms7th3kev82go7lwy0lqip1e','Question 7 for Org 2: What is 7 + 2?',NULL,'[{"text":"9"},{"text":"10"},{"text":"8"},{"text":"11"}]',0,NULL,NULL,'Mathematics','Percentage','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cm1n5ls4xr8ivfx68tm7t25x5',0,'BOTH');
INSERT INTO Question VALUES('cm0ihi1g96ea2m72i0ii4khw9','Question 8 for Org 2: What is 8 + 2?',NULL,'[{"text":"10"},{"text":"11"},{"text":"9"},{"text":"12"}]',0,NULL,NULL,'Mathematics','Time & Work','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cmy8crg0m2ylafci6hfg3gt5o',0,'BOTH');
INSERT INTO Question VALUES('cm39cll9wmzsx8ua5czod80ap','Question 9 for Org 2: What is 9 + 2?',NULL,'[{"text":"11"},{"text":"12"},{"text":"10"},{"text":"13"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cm1n5ls4xr8ivfx68tm7t25x5',0,'BOTH');
INSERT INTO Question VALUES('cmeyfadzlxfqku92x34ulth7f','Question 10 for Org 2: What is 10 + 2?',NULL,'[{"text":"12"},{"text":"13"},{"text":"11"},{"text":"14"}]',0,NULL,NULL,'General Awareness','Geography','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cmy8crg0m2ylafci6hfg3gt5o',0,'BOTH');
INSERT INTO Question VALUES('cmx5d190s76rs5rhaaupd6kgn','Question 11 for Org 2: What is 11 + 2?',NULL,'[{"text":"13"},{"text":"14"},{"text":"12"},{"text":"15"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cm1n5ls4xr8ivfx68tm7t25x5',0,'BOTH');
INSERT INTO Question VALUES('cmsyvegqn5kzr61gp9qlmq03a','Question 12 for Org 2: What is 12 + 2?',NULL,'[{"text":"14"},{"text":"15"},{"text":"13"},{"text":"16"}]',0,NULL,NULL,'General Awareness','Science','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cmh12m7wyd3zspzc8pf5btpzz',0,'BOTH');
INSERT INTO Question VALUES('cmj7zlxe5u5iq6jaj7gm73lfc','Question 13 for Org 2: What is 13 + 2?',NULL,'[{"text":"15"},{"text":"16"},{"text":"14"},{"text":"17"}]',0,NULL,NULL,'Mathematics','Time & Work','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cm1n5ls4xr8ivfx68tm7t25x5',0,'BOTH');
INSERT INTO Question VALUES('cm2iwbwuok4fnk66kzqz7i44c','Question 14 for Org 2: What is 14 + 2?',NULL,'[{"text":"16"},{"text":"17"},{"text":"15"},{"text":"18"}]',0,NULL,NULL,'Reasoning','Coding-Decoding','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cmh12m7wyd3zspzc8pf5btpzz',0,'BOTH');
INSERT INTO Question VALUES('cmhmphkh59ir8cpoo6dz30elz','Question 15 for Org 2: What is 15 + 2?',NULL,'[{"text":"17"},{"text":"18"},{"text":"16"},{"text":"19"}]',0,NULL,NULL,'English','Antonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cm1n5ls4xr8ivfx68tm7t25x5',0,'BOTH');
INSERT INTO Question VALUES('cm5rmufi58v1d9rl57e8lyal7','Question 16 for Org 2: What is 16 + 2?',NULL,'[{"text":"18"},{"text":"19"},{"text":"17"},{"text":"20"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cmy8crg0m2ylafci6hfg3gt5o',0,'BOTH');
INSERT INTO Question VALUES('cmk8fkj5g862cmezfjtow19rx','Question 17 for Org 2: What is 17 + 2?',NULL,'[{"text":"19"},{"text":"20"},{"text":"18"},{"text":"21"}]',0,NULL,NULL,'English','Grammar','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cmy8crg0m2ylafci6hfg3gt5o',0,'BOTH');
INSERT INTO Question VALUES('cmdxv81oioas7473vb5fyge6d','Question 18 for Org 2: What is 18 + 2?',NULL,'[{"text":"20"},{"text":"21"},{"text":"19"},{"text":"22"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cmy8crg0m2ylafci6hfg3gt5o',0,'BOTH');
INSERT INTO Question VALUES('cme3tb5c3tz8shsp1kd4k37z0','Question 19 for Org 2: What is 19 + 2?',NULL,'[{"text":"21"},{"text":"22"},{"text":"20"},{"text":"23"}]',0,NULL,NULL,'Reasoning','Coding-Decoding','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cmh12m7wyd3zspzc8pf5btpzz',0,'BOTH');
INSERT INTO Question VALUES('cmvkx75plt7qts3jjbmfw3y9h','Question 20 for Org 2: What is 20 + 2?',NULL,'[{"text":"22"},{"text":"23"},{"text":"21"},{"text":"24"}]',0,NULL,NULL,'English','Comprehension','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6','cm1n5ls4xr8ivfx68tm7t25x5',0,'BOTH');
INSERT INTO Question VALUES('cm7kbe8pu5zc2k8x3ijso33vj','Question 1 for Org 3: What is 1 + 3?',NULL,'[{"text":"4"},{"text":"5"},{"text":"3"},{"text":"6"}]',0,NULL,NULL,'General Awareness','Science','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cm44wnzjt8c5xofn45s8qkzsv',0,'BOTH');
INSERT INTO Question VALUES('cmwkzatkxu3gkqbt59ikyi1a2','Question 2 for Org 3: What is 2 + 3?',NULL,'[{"text":"5"},{"text":"6"},{"text":"4"},{"text":"7"}]',0,NULL,NULL,'Reasoning','Blood Relations','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cmcjl2mjejbaveid21cur558z',0,'BOTH');
INSERT INTO Question VALUES('cm0k9wiz88q52z58gsrxg9hmj','Question 3 for Org 3: What is 3 + 3?',NULL,'[{"text":"6"},{"text":"7"},{"text":"5"},{"text":"8"}]',0,NULL,NULL,'Reasoning','Syllogism','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cmpz0r7v8zbq9k8ve60gddgot',0,'BOTH');
INSERT INTO Question VALUES('cm2u2p36qvsfg0cs1xlqf48q4','Question 4 for Org 3: What is 4 + 3?',NULL,'[{"text":"7"},{"text":"8"},{"text":"6"},{"text":"9"}]',0,NULL,NULL,'Mathematics','Algebra','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cmcjl2mjejbaveid21cur558z',0,'BOTH');
INSERT INTO Question VALUES('cmegkhnfsa925sv6ws13qjn4j','Question 5 for Org 3: What is 5 + 3?',NULL,'[{"text":"8"},{"text":"9"},{"text":"7"},{"text":"10"}]',0,NULL,NULL,'General Awareness','Geography','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cmcjl2mjejbaveid21cur558z',0,'BOTH');
INSERT INTO Question VALUES('cm8ipt5zfuu5xu84x37s606tb','Question 6 for Org 3: What is 6 + 3?',NULL,'[{"text":"9"},{"text":"10"},{"text":"8"},{"text":"11"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cmcjl2mjejbaveid21cur558z',0,'BOTH');
INSERT INTO Question VALUES('cm8cj7k4keeg6vzukxj7mhjt2','Question 7 for Org 3: What is 7 + 3?',NULL,'[{"text":"10"},{"text":"11"},{"text":"9"},{"text":"12"}]',0,NULL,NULL,'Mathematics','Trigonometry','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cmcjl2mjejbaveid21cur558z',0,'BOTH');
INSERT INTO Question VALUES('cmnpc17lsrsmoiic8119ti1ij','Question 8 for Org 3: What is 8 + 3?',NULL,'[{"text":"11"},{"text":"12"},{"text":"10"},{"text":"13"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cm44wnzjt8c5xofn45s8qkzsv',0,'BOTH');
INSERT INTO Question VALUES('cmron0eu1tay2d87hs65qqwmd','Question 9 for Org 3: What is 9 + 3?',NULL,'[{"text":"12"},{"text":"13"},{"text":"11"},{"text":"14"}]',0,NULL,NULL,'Mathematics','Algebra','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cmpz0r7v8zbq9k8ve60gddgot',0,'BOTH');
INSERT INTO Question VALUES('cm0boe5rehxq1ca4pa01oucdo','Question 10 for Org 3: What is 10 + 3?',NULL,'[{"text":"13"},{"text":"14"},{"text":"12"},{"text":"15"}]',0,NULL,NULL,'Reasoning','Analogy','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cmcjl2mjejbaveid21cur558z',0,'BOTH');
INSERT INTO Question VALUES('cm0o7awfjrlx2judbd6c4axml','Question 11 for Org 3: What is 11 + 3?',NULL,'[{"text":"14"},{"text":"15"},{"text":"13"},{"text":"16"}]',0,NULL,NULL,'General Awareness','Polity','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cmpz0r7v8zbq9k8ve60gddgot',0,'BOTH');
INSERT INTO Question VALUES('cmtu47dbb9k59avrpd5d70yi4','Question 12 for Org 3: What is 12 + 3?',NULL,'[{"text":"15"},{"text":"16"},{"text":"14"},{"text":"17"}]',0,NULL,NULL,'Reasoning','Series','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cm44wnzjt8c5xofn45s8qkzsv',0,'BOTH');
INSERT INTO Question VALUES('cmajjzzzigv5ki52xh8vy2sg6','Question 13 for Org 3: What is 13 + 3?',NULL,'[{"text":"16"},{"text":"17"},{"text":"15"},{"text":"18"}]',0,NULL,NULL,'General Awareness','Geography','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cm44wnzjt8c5xofn45s8qkzsv',0,'BOTH');
INSERT INTO Question VALUES('cmf5qqgfxeexvvbm9g6612qeb','Question 14 for Org 3: What is 14 + 3?',NULL,'[{"text":"17"},{"text":"18"},{"text":"16"},{"text":"19"}]',0,NULL,NULL,'Mathematics','Profit & Loss','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cmcjl2mjejbaveid21cur558z',0,'BOTH');
INSERT INTO Question VALUES('cmhqn29h3wpn84sxma6crtyc4','Question 15 for Org 3: What is 15 + 3?',NULL,'[{"text":"18"},{"text":"19"},{"text":"17"},{"text":"20"}]',0,NULL,NULL,'Mathematics','Trigonometry','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cm44wnzjt8c5xofn45s8qkzsv',0,'BOTH');
INSERT INTO Question VALUES('cm1nj64vu6774q2pv9x4wcq7c','Question 16 for Org 3: What is 16 + 3?',NULL,'[{"text":"19"},{"text":"20"},{"text":"18"},{"text":"21"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cmpz0r7v8zbq9k8ve60gddgot',0,'BOTH');
INSERT INTO Question VALUES('cmi0gr03tgbj966htrn9bhqzq','Question 17 for Org 3: What is 17 + 3?',NULL,'[{"text":"20"},{"text":"21"},{"text":"19"},{"text":"22"}]',0,NULL,NULL,'Mathematics','Percentage','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cm44wnzjt8c5xofn45s8qkzsv',0,'BOTH');
INSERT INTO Question VALUES('cmcno4ev3ctufzi1l8atc1ohk','Question 18 for Org 3: What is 18 + 3?',NULL,'[{"text":"21"},{"text":"22"},{"text":"20"},{"text":"23"}]',0,NULL,NULL,'Reasoning','Blood Relations','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cmcjl2mjejbaveid21cur558z',0,'BOTH');
INSERT INTO Question VALUES('cmv0nr5ufpo3hxez09w5mtfnn','Question 19 for Org 3: What is 19 + 3?',NULL,'[{"text":"22"},{"text":"23"},{"text":"21"},{"text":"24"}]',0,NULL,NULL,'General Awareness','Geography','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cmpz0r7v8zbq9k8ve60gddgot',0,'BOTH');
INSERT INTO Question VALUES('cmy8yqlds4bd30o5ffjr2d2gs','Question 20 for Org 3: What is 20 + 3?',NULL,'[{"text":"23"},{"text":"24"},{"text":"22"},{"text":"25"}]',0,NULL,NULL,'Reasoning','Syllogism','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6','cm44wnzjt8c5xofn45s8qkzsv',0,'BOTH');
INSERT INTO Question VALUES('cm3qzkof40sxyh9z7q4xlqtzp','Question 1 for Org 4: What is 1 + 4?',NULL,'[{"text":"5"},{"text":"6"},{"text":"4"},{"text":"7"}]',0,NULL,NULL,'Mathematics','Algebra','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cmtzgvuyaifz567nbves03nwt',0,'BOTH');
INSERT INTO Question VALUES('cmnrd0leh2ih5o7hxbdm9a4up','Question 2 for Org 4: What is 2 + 4?',NULL,'[{"text":"6"},{"text":"7"},{"text":"5"},{"text":"8"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cm7eayashujgrpe9ftkxh8tnr',0,'BOTH');
INSERT INTO Question VALUES('cmla8wjy9kt48erydi5j8vnrs','Question 3 for Org 4: What is 3 + 4?',NULL,'[{"text":"7"},{"text":"8"},{"text":"6"},{"text":"9"}]',0,NULL,NULL,'English','Comprehension','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cmrzv583n0jq931u6xguchg3a',0,'BOTH');
INSERT INTO Question VALUES('cmeqcokr5o16che1mucv6apjf','Question 4 for Org 4: What is 4 + 4?',NULL,'[{"text":"8"},{"text":"9"},{"text":"7"},{"text":"10"}]',0,NULL,NULL,'English','Grammar','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cm7eayashujgrpe9ftkxh8tnr',0,'BOTH');
INSERT INTO Question VALUES('cmqbwfcupslxw1zvv82ryvq7v','Question 5 for Org 4: What is 5 + 4?',NULL,'[{"text":"9"},{"text":"10"},{"text":"8"},{"text":"11"}]',0,NULL,NULL,'Mathematics','Algebra','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cm7eayashujgrpe9ftkxh8tnr',0,'BOTH');
INSERT INTO Question VALUES('cm2tx139jwfpjoi6kl38p7w2f','Question 6 for Org 4: What is 6 + 4?',NULL,'[{"text":"10"},{"text":"11"},{"text":"9"},{"text":"12"}]',0,NULL,NULL,'English','Antonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cmrzv583n0jq931u6xguchg3a',0,'BOTH');
INSERT INTO Question VALUES('cmn2nym7j13ou6kh085yehetz','Question 7 for Org 4: What is 7 + 4?',NULL,'[{"text":"11"},{"text":"12"},{"text":"10"},{"text":"13"}]',0,NULL,NULL,'Reasoning','Series','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cmrzv583n0jq931u6xguchg3a',0,'BOTH');
INSERT INTO Question VALUES('cm51zj1n7uplyj5hb08gs7y3n','Question 8 for Org 4: What is 8 + 4?',NULL,'[{"text":"12"},{"text":"13"},{"text":"11"},{"text":"14"}]',0,NULL,NULL,'Mathematics','Time & Work','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cmtzgvuyaifz567nbves03nwt',0,'BOTH');
INSERT INTO Question VALUES('cm8x949h4dmsifdwewokf4ivb','Question 9 for Org 4: What is 9 + 4?',NULL,'[{"text":"13"},{"text":"14"},{"text":"12"},{"text":"15"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cmrzv583n0jq931u6xguchg3a',0,'BOTH');
INSERT INTO Question VALUES('cmdo3bl5i44v387zxuj6svkxd','Question 10 for Org 4: What is 10 + 4?',NULL,'[{"text":"14"},{"text":"15"},{"text":"13"},{"text":"16"}]',0,NULL,NULL,'Reasoning','Analogy','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cmtzgvuyaifz567nbves03nwt',0,'BOTH');
INSERT INTO Question VALUES('cm8eaax7xi23xadbmlxw7ixa8','Question 11 for Org 4: What is 11 + 4?',NULL,'[{"text":"15"},{"text":"16"},{"text":"14"},{"text":"17"}]',0,NULL,NULL,'English','Grammar','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cmrzv583n0jq931u6xguchg3a',0,'BOTH');
INSERT INTO Question VALUES('cmvbwdk6pp4vihow1ofpsh8zl','Question 12 for Org 4: What is 12 + 4?',NULL,'[{"text":"16"},{"text":"17"},{"text":"15"},{"text":"18"}]',0,NULL,NULL,'Mathematics','Profit & Loss','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cmtzgvuyaifz567nbves03nwt',0,'BOTH');
INSERT INTO Question VALUES('cm4lsrdgz69veqhykraap34ka','Question 13 for Org 4: What is 13 + 4?',NULL,'[{"text":"17"},{"text":"18"},{"text":"16"},{"text":"19"}]',0,NULL,NULL,'Mathematics','Percentage','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cm7eayashujgrpe9ftkxh8tnr',0,'BOTH');
INSERT INTO Question VALUES('cm0a6bh67x16qm57k8rclpbyw','Question 14 for Org 4: What is 14 + 4?',NULL,'[{"text":"18"},{"text":"19"},{"text":"17"},{"text":"20"}]',0,NULL,NULL,'Reasoning','Analogy','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cmrzv583n0jq931u6xguchg3a',0,'BOTH');
INSERT INTO Question VALUES('cmjsnhf8zxdsmuczqdyawe1ew','Question 15 for Org 4: What is 15 + 4?',NULL,'[{"text":"19"},{"text":"20"},{"text":"18"},{"text":"21"}]',0,NULL,NULL,'Reasoning','Analogy','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cm7eayashujgrpe9ftkxh8tnr',0,'BOTH');
INSERT INTO Question VALUES('cm1cm546hba0y90n8g6qjjshr','Question 16 for Org 4: What is 16 + 4?',NULL,'[{"text":"20"},{"text":"21"},{"text":"19"},{"text":"22"}]',0,NULL,NULL,'English','Grammar','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cm7eayashujgrpe9ftkxh8tnr',0,'BOTH');
INSERT INTO Question VALUES('cm5p5nydapr4avlm3nuy3d6s3','Question 17 for Org 4: What is 17 + 4?',NULL,'[{"text":"21"},{"text":"22"},{"text":"20"},{"text":"23"}]',0,NULL,NULL,'Mathematics','Trigonometry','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cm7eayashujgrpe9ftkxh8tnr',0,'BOTH');
INSERT INTO Question VALUES('cm5xizzddyujid1znnssihvry','Question 18 for Org 4: What is 18 + 4?',NULL,'[{"text":"22"},{"text":"23"},{"text":"21"},{"text":"24"}]',0,NULL,NULL,'English','Comprehension','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cmrzv583n0jq931u6xguchg3a',0,'BOTH');
INSERT INTO Question VALUES('cmdg0egbi2vfwy4qov98jovqz','Question 19 for Org 4: What is 19 + 4?',NULL,'[{"text":"23"},{"text":"24"},{"text":"22"},{"text":"25"}]',0,NULL,NULL,'Reasoning','Analogy','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cm7eayashujgrpe9ftkxh8tnr',0,'BOTH');
INSERT INTO Question VALUES('cmckchh2pyo2nevuu940i9qj8','Question 20 for Org 4: What is 20 + 4?',NULL,'[{"text":"24"},{"text":"25"},{"text":"23"},{"text":"26"}]',0,NULL,NULL,'English','Synonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q','cmtzgvuyaifz567nbves03nwt',0,'BOTH');
INSERT INTO Question VALUES('cmbht6o7gj5tyyfrgihd4d0wc','Question 1 for Org 5: What is 1 + 5?',NULL,'[{"text":"6"},{"text":"7"},{"text":"5"},{"text":"8"}]',0,NULL,NULL,'Mathematics','Trigonometry','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cmpy8d1csdjcsahvp44yfa0gw',0,'BOTH');
INSERT INTO Question VALUES('cmk553p7q8gsask4otxgkycif','Question 2 for Org 5: What is 2 + 5?',NULL,'[{"text":"7"},{"text":"8"},{"text":"6"},{"text":"9"}]',0,NULL,NULL,'English','Synonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cmamb1fpe501vj9q7iv5dxusx',0,'BOTH');
INSERT INTO Question VALUES('cmpv1343kls6l0mg6f3ux6p7u','Question 3 for Org 5: What is 3 + 5?',NULL,'[{"text":"8"},{"text":"9"},{"text":"7"},{"text":"10"}]',0,NULL,NULL,'English','Synonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cma0i6zdp15ez34vzfozwhu2q',0,'BOTH');
INSERT INTO Question VALUES('cmq5go9wj2611fjb55yq2r2nw','Question 4 for Org 5: What is 4 + 5?',NULL,'[{"text":"9"},{"text":"10"},{"text":"8"},{"text":"11"}]',0,NULL,NULL,'English','Antonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cmamb1fpe501vj9q7iv5dxusx',0,'BOTH');
INSERT INTO Question VALUES('cm92pjgr3cw4dna714um7yvuz','Question 5 for Org 5: What is 5 + 5?',NULL,'[{"text":"10"},{"text":"11"},{"text":"9"},{"text":"12"}]',0,NULL,NULL,'Reasoning','Analogy','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cmpy8d1csdjcsahvp44yfa0gw',0,'BOTH');
INSERT INTO Question VALUES('cmebcg6cv1ua0e3dp18nyin7w','Question 6 for Org 5: What is 6 + 5?',NULL,'[{"text":"11"},{"text":"12"},{"text":"10"},{"text":"13"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cmamb1fpe501vj9q7iv5dxusx',0,'BOTH');
INSERT INTO Question VALUES('cmbdg0nbjilam7ebh7t4f4fhk','Question 7 for Org 5: What is 7 + 5?',NULL,'[{"text":"12"},{"text":"13"},{"text":"11"},{"text":"14"}]',0,NULL,NULL,'English','Antonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cma0i6zdp15ez34vzfozwhu2q',0,'BOTH');
INSERT INTO Question VALUES('cmodkajoc95bhtgkiz3n8rfmz','Question 8 for Org 5: What is 8 + 5?',NULL,'[{"text":"13"},{"text":"14"},{"text":"12"},{"text":"15"}]',0,NULL,NULL,'General Awareness','Polity','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cma0i6zdp15ez34vzfozwhu2q',0,'BOTH');
INSERT INTO Question VALUES('cmojpqz8mwxqpu1nagcusgkui','Question 9 for Org 5: What is 9 + 5?',NULL,'[{"text":"14"},{"text":"15"},{"text":"13"},{"text":"16"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cma0i6zdp15ez34vzfozwhu2q',0,'BOTH');
INSERT INTO Question VALUES('cmkf6tkhxvqtv34w9rbkgzmqn','Question 10 for Org 5: What is 10 + 5?',NULL,'[{"text":"15"},{"text":"16"},{"text":"14"},{"text":"17"}]',0,NULL,NULL,'Mathematics','Trigonometry','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cma0i6zdp15ez34vzfozwhu2q',0,'BOTH');
INSERT INTO Question VALUES('cmt8vawmymgbh4amxay7ccik8','Question 11 for Org 5: What is 11 + 5?',NULL,'[{"text":"16"},{"text":"17"},{"text":"15"},{"text":"18"}]',0,NULL,NULL,'Mathematics','Algebra','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cmamb1fpe501vj9q7iv5dxusx',0,'BOTH');
INSERT INTO Question VALUES('cmztb4gf7490ogekrtmxrb16i','Question 12 for Org 5: What is 12 + 5?',NULL,'[{"text":"17"},{"text":"18"},{"text":"16"},{"text":"19"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cmpy8d1csdjcsahvp44yfa0gw',0,'BOTH');
INSERT INTO Question VALUES('cmuxqxsbwwytsj8czuvp1jywp','Question 13 for Org 5: What is 13 + 5?',NULL,'[{"text":"18"},{"text":"19"},{"text":"17"},{"text":"20"}]',0,NULL,NULL,'English','Antonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cma0i6zdp15ez34vzfozwhu2q',0,'BOTH');
INSERT INTO Question VALUES('cmmee035l0lkagu7ttqj4mf75','Question 14 for Org 5: What is 14 + 5?',NULL,'[{"text":"19"},{"text":"20"},{"text":"18"},{"text":"21"}]',0,NULL,NULL,'Mathematics','Time & Work','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cmamb1fpe501vj9q7iv5dxusx',0,'BOTH');
INSERT INTO Question VALUES('cmk7xmeo3mvnl6fibvs7et7bt','Question 15 for Org 5: What is 15 + 5?',NULL,'[{"text":"20"},{"text":"21"},{"text":"19"},{"text":"22"}]',0,NULL,NULL,'English','Vocabulary','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cmpy8d1csdjcsahvp44yfa0gw',0,'BOTH');
INSERT INTO Question VALUES('cm4kbdn2q4kpw22wqdns839pk','Question 16 for Org 5: What is 16 + 5?',NULL,'[{"text":"21"},{"text":"22"},{"text":"20"},{"text":"23"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cmamb1fpe501vj9q7iv5dxusx',0,'BOTH');
INSERT INTO Question VALUES('cm805xoqrn6jg03tei3zdkng7','Question 17 for Org 5: What is 17 + 5?',NULL,'[{"text":"22"},{"text":"23"},{"text":"21"},{"text":"24"}]',0,NULL,NULL,'General Awareness','Science','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cmamb1fpe501vj9q7iv5dxusx',0,'BOTH');
INSERT INTO Question VALUES('cmr0ecacugzwolfo7h0nzog1c','Question 18 for Org 5: What is 18 + 5?',NULL,'[{"text":"23"},{"text":"24"},{"text":"22"},{"text":"25"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cmamb1fpe501vj9q7iv5dxusx',0,'BOTH');
INSERT INTO Question VALUES('cm8w7elfmvq8q2520mqhdvjpq','Question 19 for Org 5: What is 19 + 5?',NULL,'[{"text":"24"},{"text":"25"},{"text":"23"},{"text":"26"}]',0,NULL,NULL,'General Awareness','Polity','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cma0i6zdp15ez34vzfozwhu2q',0,'BOTH');
INSERT INTO Question VALUES('cm2r1z2tndwmzo64q68ri5yih','Question 20 for Org 5: What is 20 + 5?',NULL,'[{"text":"25"},{"text":"26"},{"text":"24"},{"text":"27"}]',0,NULL,NULL,'Reasoning','Coding-Decoding','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8','cmamb1fpe501vj9q7iv5dxusx',0,'BOTH');
INSERT INTO Question VALUES('cmzv2umpnq3b5tx85yblixhq3','Question 1 for Org 6: What is 1 + 6?',NULL,'[{"text":"7"},{"text":"8"},{"text":"6"},{"text":"9"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cm8hqazw5ffx1cyonwjf176g4',0,'BOTH');
INSERT INTO Question VALUES('cmhdkl0g02aaiq1u46wbou59z','Question 2 for Org 6: What is 2 + 6?',NULL,'[{"text":"8"},{"text":"9"},{"text":"7"},{"text":"10"}]',0,NULL,NULL,'General Awareness','Geography','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmewp0k5rqnke68x9i1i8ii8k',0,'BOTH');
INSERT INTO Question VALUES('cmtee70h436n4kz1zbojnef6r','Question 3 for Org 6: What is 3 + 6?',NULL,'[{"text":"9"},{"text":"10"},{"text":"8"},{"text":"11"}]',0,NULL,NULL,'Reasoning','Coding-Decoding','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmthf6kfsldjmuzhvks4pzcod',0,'BOTH');
INSERT INTO Question VALUES('cmkul2ij1jvf9kgsyvpw2t69k','Question 4 for Org 6: What is 4 + 6?',NULL,'[{"text":"10"},{"text":"11"},{"text":"9"},{"text":"12"}]',0,NULL,NULL,'General Awareness','Geography','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmewp0k5rqnke68x9i1i8ii8k',0,'BOTH');
INSERT INTO Question VALUES('cmyadu9hb2zusj51pdurk6nf3','Question 5 for Org 6: What is 5 + 6?',NULL,'[{"text":"11"},{"text":"12"},{"text":"10"},{"text":"13"}]',0,NULL,NULL,'English','Grammar','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmthf6kfsldjmuzhvks4pzcod',0,'BOTH');
INSERT INTO Question VALUES('cmg0bylaa921rcoy1utiqgu3y','Question 6 for Org 6: What is 6 + 6?',NULL,'[{"text":"12"},{"text":"13"},{"text":"11"},{"text":"14"}]',0,NULL,NULL,'General Awareness','Polity','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmewp0k5rqnke68x9i1i8ii8k',0,'BOTH');
INSERT INTO Question VALUES('cm4udjg427dbpc4yxi3ix2auf','Question 7 for Org 6: What is 7 + 6?',NULL,'[{"text":"13"},{"text":"14"},{"text":"12"},{"text":"15"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cm8hqazw5ffx1cyonwjf176g4',0,'BOTH');
INSERT INTO Question VALUES('cmi5d5c905ul41cerq510ep3q','Question 8 for Org 6: What is 8 + 6?',NULL,'[{"text":"14"},{"text":"15"},{"text":"13"},{"text":"16"}]',0,NULL,NULL,'Reasoning','Coding-Decoding','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmthf6kfsldjmuzhvks4pzcod',0,'BOTH');
INSERT INTO Question VALUES('cmzi1dfad5o6zhdetyo4bd1zk','Question 9 for Org 6: What is 9 + 6?',NULL,'[{"text":"15"},{"text":"16"},{"text":"14"},{"text":"17"}]',0,NULL,NULL,'General Awareness','Geography','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmthf6kfsldjmuzhvks4pzcod',0,'BOTH');
INSERT INTO Question VALUES('cmd3ew20e24vvbv6diemlo43g','Question 10 for Org 6: What is 10 + 6?',NULL,'[{"text":"16"},{"text":"17"},{"text":"15"},{"text":"18"}]',0,NULL,NULL,'Mathematics','Algebra','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmthf6kfsldjmuzhvks4pzcod',0,'BOTH');
INSERT INTO Question VALUES('cmcigeorfy3ntw0dgjh410rxr','Question 11 for Org 6: What is 11 + 6?',NULL,'[{"text":"17"},{"text":"18"},{"text":"16"},{"text":"19"}]',0,NULL,NULL,'English','Comprehension','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmthf6kfsldjmuzhvks4pzcod',0,'BOTH');
INSERT INTO Question VALUES('cmwvnitc1qk4t2qslhxqdzj3p','Question 12 for Org 6: What is 12 + 6?',NULL,'[{"text":"18"},{"text":"19"},{"text":"17"},{"text":"20"}]',0,NULL,NULL,'English','Grammar','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cm8hqazw5ffx1cyonwjf176g4',0,'BOTH');
INSERT INTO Question VALUES('cm7ebrq9h9jjta84s2z4rygm9','Question 13 for Org 6: What is 13 + 6?',NULL,'[{"text":"19"},{"text":"20"},{"text":"18"},{"text":"21"}]',0,NULL,NULL,'Reasoning','Series','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmthf6kfsldjmuzhvks4pzcod',0,'BOTH');
INSERT INTO Question VALUES('cmni0z7zvpiak2s7g5jhx5phb','Question 14 for Org 6: What is 14 + 6?',NULL,'[{"text":"20"},{"text":"21"},{"text":"19"},{"text":"22"}]',0,NULL,NULL,'English','Comprehension','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmthf6kfsldjmuzhvks4pzcod',0,'BOTH');
INSERT INTO Question VALUES('cmn3zcalacye1ltcxi1kxodun','Question 15 for Org 6: What is 15 + 6?',NULL,'[{"text":"21"},{"text":"22"},{"text":"20"},{"text":"23"}]',0,NULL,NULL,'English','Synonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmthf6kfsldjmuzhvks4pzcod',0,'BOTH');
INSERT INTO Question VALUES('cmz7lz3gcx1y08vf0o87glvx0','Question 16 for Org 6: What is 16 + 6?',NULL,'[{"text":"22"},{"text":"23"},{"text":"21"},{"text":"24"}]',0,NULL,NULL,'Reasoning','Syllogism','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cm8hqazw5ffx1cyonwjf176g4',0,'BOTH');
INSERT INTO Question VALUES('cmmvma3ueixxg89kq2j5ld18h','Question 17 for Org 6: What is 17 + 6?',NULL,'[{"text":"23"},{"text":"24"},{"text":"22"},{"text":"25"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmthf6kfsldjmuzhvks4pzcod',0,'BOTH');
INSERT INTO Question VALUES('cmxdb9jcrt788byxb6qcsblby','Question 18 for Org 6: What is 18 + 6?',NULL,'[{"text":"24"},{"text":"25"},{"text":"23"},{"text":"26"}]',0,NULL,NULL,'Mathematics','Percentage','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmthf6kfsldjmuzhvks4pzcod',0,'BOTH');
INSERT INTO Question VALUES('cmi1ae0qz61q3efisg8fba08f','Question 19 for Org 6: What is 19 + 6?',NULL,'[{"text":"25"},{"text":"26"},{"text":"24"},{"text":"27"}]',0,NULL,NULL,'General Awareness','Geography','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmewp0k5rqnke68x9i1i8ii8k',0,'BOTH');
INSERT INTO Question VALUES('cmu5kzvu48kl4xcxxp73mh3h2','Question 20 for Org 6: What is 20 + 6?',NULL,'[{"text":"26"},{"text":"27"},{"text":"25"},{"text":"28"}]',0,NULL,NULL,'General Awareness','Science','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a','cmthf6kfsldjmuzhvks4pzcod',0,'BOTH');
INSERT INTO Question VALUES('cmxpnvcozfcsu67cg2qlcgex2','Question 1 for Org 7: What is 1 + 7?',NULL,'[{"text":"8"},{"text":"9"},{"text":"7"},{"text":"10"}]',0,NULL,NULL,'Reasoning','Blood Relations','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cmxoyp6ql16t74gs5ntmibby1',0,'BOTH');
INSERT INTO Question VALUES('cm8q7p30ur3vophievozlskb4','Question 2 for Org 7: What is 2 + 7?',NULL,'[{"text":"9"},{"text":"10"},{"text":"8"},{"text":"11"}]',0,NULL,NULL,'General Awareness','Science','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cmrfwiavjw2xwuc67xdtsqn4t',0,'BOTH');
INSERT INTO Question VALUES('cme1a0w29ywr2bfzsddb9lfng','Question 3 for Org 7: What is 3 + 7?',NULL,'[{"text":"10"},{"text":"11"},{"text":"9"},{"text":"12"}]',0,NULL,NULL,'Mathematics','Profit & Loss','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cmrfwiavjw2xwuc67xdtsqn4t',0,'BOTH');
INSERT INTO Question VALUES('cmoodezwbhbn7l2usj32krgc2','Question 4 for Org 7: What is 4 + 7?',NULL,'[{"text":"11"},{"text":"12"},{"text":"10"},{"text":"13"}]',0,NULL,NULL,'English','Grammar','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cm80nj84z8su2wxloddjki3af',0,'BOTH');
INSERT INTO Question VALUES('cmmvcsg9mihzs4k9bdlhu9aku','Question 5 for Org 7: What is 5 + 7?',NULL,'[{"text":"12"},{"text":"13"},{"text":"11"},{"text":"14"}]',0,NULL,NULL,'Reasoning','Coding-Decoding','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cm80nj84z8su2wxloddjki3af',0,'BOTH');
INSERT INTO Question VALUES('cmq32dkrwq6ghz2kshkfugqla','Question 6 for Org 7: What is 6 + 7?',NULL,'[{"text":"13"},{"text":"14"},{"text":"12"},{"text":"15"}]',0,NULL,NULL,'Reasoning','Syllogism','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cmxoyp6ql16t74gs5ntmibby1',0,'BOTH');
INSERT INTO Question VALUES('cmeutko8pi4yofz7771nb4ron','Question 7 for Org 7: What is 7 + 7?',NULL,'[{"text":"14"},{"text":"15"},{"text":"13"},{"text":"16"}]',0,NULL,NULL,'English','Antonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cmrfwiavjw2xwuc67xdtsqn4t',0,'BOTH');
INSERT INTO Question VALUES('cmtvib5zj0xjjzkgumreivte3','Question 8 for Org 7: What is 8 + 7?',NULL,'[{"text":"15"},{"text":"16"},{"text":"14"},{"text":"17"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cmxoyp6ql16t74gs5ntmibby1',0,'BOTH');
INSERT INTO Question VALUES('cm35y2lob55ph0wdixxgn0p09','Question 9 for Org 7: What is 9 + 7?',NULL,'[{"text":"16"},{"text":"17"},{"text":"15"},{"text":"18"}]',0,NULL,NULL,'Mathematics','Percentage','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cmxoyp6ql16t74gs5ntmibby1',0,'BOTH');
INSERT INTO Question VALUES('cmc358dy6npysjiaeyl4s41ad','Question 10 for Org 7: What is 10 + 7?',NULL,'[{"text":"17"},{"text":"18"},{"text":"16"},{"text":"19"}]',0,NULL,NULL,'Reasoning','Series','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cm80nj84z8su2wxloddjki3af',0,'BOTH');
INSERT INTO Question VALUES('cmw03do3pp3us2pyv1974mwpy','Question 11 for Org 7: What is 11 + 7?',NULL,'[{"text":"18"},{"text":"19"},{"text":"17"},{"text":"20"}]',0,NULL,NULL,'Reasoning','Blood Relations','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cm80nj84z8su2wxloddjki3af',0,'BOTH');
INSERT INTO Question VALUES('cmvplalw7dz33suzg5ax98u1c','Question 12 for Org 7: What is 12 + 7?',NULL,'[{"text":"19"},{"text":"20"},{"text":"18"},{"text":"21"}]',0,NULL,NULL,'Reasoning','Analogy','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cmrfwiavjw2xwuc67xdtsqn4t',0,'BOTH');
INSERT INTO Question VALUES('cm429p8c8rwzxja97rcqhlmce','Question 13 for Org 7: What is 13 + 7?',NULL,'[{"text":"20"},{"text":"21"},{"text":"19"},{"text":"22"}]',0,NULL,NULL,'English','Grammar','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cmrfwiavjw2xwuc67xdtsqn4t',0,'BOTH');
INSERT INTO Question VALUES('cmtwx58lwr4dwspj4puaf8jpn','Question 14 for Org 7: What is 14 + 7?',NULL,'[{"text":"21"},{"text":"22"},{"text":"20"},{"text":"23"}]',0,NULL,NULL,'Reasoning','Analogy','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cm80nj84z8su2wxloddjki3af',0,'BOTH');
INSERT INTO Question VALUES('cm03ek1yfjyrlgf89q91i76kw','Question 15 for Org 7: What is 15 + 7?',NULL,'[{"text":"22"},{"text":"23"},{"text":"21"},{"text":"24"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cmxoyp6ql16t74gs5ntmibby1',0,'BOTH');
INSERT INTO Question VALUES('cmpe6e6iq739dmnily7f5qjvb','Question 16 for Org 7: What is 16 + 7?',NULL,'[{"text":"23"},{"text":"24"},{"text":"22"},{"text":"25"}]',0,NULL,NULL,'English','Antonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cmrfwiavjw2xwuc67xdtsqn4t',0,'BOTH');
INSERT INTO Question VALUES('cm0jp1gvnetrz4oa5r1gp09d6','Question 17 for Org 7: What is 17 + 7?',NULL,'[{"text":"24"},{"text":"25"},{"text":"23"},{"text":"26"}]',0,NULL,NULL,'Reasoning','Coding-Decoding','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cm80nj84z8su2wxloddjki3af',0,'BOTH');
INSERT INTO Question VALUES('cm1vunwshye8lpvfwfuw4gzda','Question 18 for Org 7: What is 18 + 7?',NULL,'[{"text":"25"},{"text":"26"},{"text":"24"},{"text":"27"}]',0,NULL,NULL,'English','Antonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cm80nj84z8su2wxloddjki3af',0,'BOTH');
INSERT INTO Question VALUES('cm5fno6y9c4lq5fp7n0iv78wg','Question 19 for Org 7: What is 19 + 7?',NULL,'[{"text":"26"},{"text":"27"},{"text":"25"},{"text":"28"}]',0,NULL,NULL,'Mathematics','Trigonometry','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cm80nj84z8su2wxloddjki3af',0,'BOTH');
INSERT INTO Question VALUES('cm4uk1gmv56te5guz3znrgli1','Question 20 for Org 7: What is 20 + 7?',NULL,'[{"text":"27"},{"text":"28"},{"text":"26"},{"text":"29"}]',0,NULL,NULL,'English','Comprehension','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9','cmrfwiavjw2xwuc67xdtsqn4t',0,'BOTH');
INSERT INTO Question VALUES('cmgn7o07v1iskttxx0v4lyc6f','Question 1 for Org 8: What is 1 + 8?',NULL,'[{"text":"9"},{"text":"10"},{"text":"8"},{"text":"11"}]',0,NULL,NULL,'Mathematics','Percentage','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmwxqmiulp7imk3ujuwjrzpx2',0,'BOTH');
INSERT INTO Question VALUES('cmwumjgbbg2e9avobsmgmjygv','Question 2 for Org 8: What is 2 + 8?',NULL,'[{"text":"10"},{"text":"11"},{"text":"9"},{"text":"12"}]',0,NULL,NULL,'Mathematics','Time & Work','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmwxqmiulp7imk3ujuwjrzpx2',0,'BOTH');
INSERT INTO Question VALUES('cmb7jd3do5g2igl0h547axiuo','Question 3 for Org 8: What is 3 + 8?',NULL,'[{"text":"11"},{"text":"12"},{"text":"10"},{"text":"13"}]',0,NULL,NULL,'Mathematics','Profit & Loss','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmwxqmiulp7imk3ujuwjrzpx2',0,'BOTH');
INSERT INTO Question VALUES('cm8lfxgbrk2eb5tppcntjy1ba','Question 4 for Org 8: What is 4 + 8?',NULL,'[{"text":"12"},{"text":"13"},{"text":"11"},{"text":"14"}]',0,NULL,NULL,'Reasoning','Series','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmmrh500ix6icsp4b22j72ld4',0,'BOTH');
INSERT INTO Question VALUES('cmuvkb5o25gsc87yo98dm7erq','Question 5 for Org 8: What is 5 + 8?',NULL,'[{"text":"13"},{"text":"14"},{"text":"12"},{"text":"15"}]',0,NULL,NULL,'English','Grammar','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmmrh500ix6icsp4b22j72ld4',0,'BOTH');
INSERT INTO Question VALUES('cml4v3aev22pdohaz0r04ie90','Question 6 for Org 8: What is 6 + 8?',NULL,'[{"text":"14"},{"text":"15"},{"text":"13"},{"text":"16"}]',0,NULL,NULL,'Mathematics','Time & Work','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmmrh500ix6icsp4b22j72ld4',0,'BOTH');
INSERT INTO Question VALUES('cm54vo5msgkpdanjjcnozqdj1','Question 7 for Org 8: What is 7 + 8?',NULL,'[{"text":"15"},{"text":"16"},{"text":"14"},{"text":"17"}]',0,NULL,NULL,'English','Vocabulary','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmhq9tdv7omabawdq6arxzrlk',0,'BOTH');
INSERT INTO Question VALUES('cmhrtbg2tbpx2k80wj2s8lstf','Question 8 for Org 8: What is 8 + 8?',NULL,'[{"text":"16"},{"text":"17"},{"text":"15"},{"text":"18"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmhq9tdv7omabawdq6arxzrlk',0,'BOTH');
INSERT INTO Question VALUES('cmvbj7oesgfem1gpys84lyqmp','Question 9 for Org 8: What is 9 + 8?',NULL,'[{"text":"17"},{"text":"18"},{"text":"16"},{"text":"19"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmmrh500ix6icsp4b22j72ld4',0,'BOTH');
INSERT INTO Question VALUES('cm5bt3vem0zpdfrlv15uso2sk','Question 10 for Org 8: What is 10 + 8?',NULL,'[{"text":"18"},{"text":"19"},{"text":"17"},{"text":"20"}]',0,NULL,NULL,'General Awareness','Polity','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmhq9tdv7omabawdq6arxzrlk',0,'BOTH');
INSERT INTO Question VALUES('cmqsdmxg6dsgxx47wopixmb88','Question 11 for Org 8: What is 11 + 8?',NULL,'[{"text":"19"},{"text":"20"},{"text":"18"},{"text":"21"}]',0,NULL,NULL,'Reasoning','Syllogism','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmmrh500ix6icsp4b22j72ld4',0,'BOTH');
INSERT INTO Question VALUES('cmm1ppvkroq20ssvlj7xvkw00','Question 12 for Org 8: What is 12 + 8?',NULL,'[{"text":"20"},{"text":"21"},{"text":"19"},{"text":"22"}]',0,NULL,NULL,'Mathematics','Algebra','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmwxqmiulp7imk3ujuwjrzpx2',0,'BOTH');
INSERT INTO Question VALUES('cm8i5i3masdv5ioqj0y061c2l','Question 13 for Org 8: What is 13 + 8?',NULL,'[{"text":"21"},{"text":"22"},{"text":"20"},{"text":"23"}]',0,NULL,NULL,'Mathematics','Algebra','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmmrh500ix6icsp4b22j72ld4',0,'BOTH');
INSERT INTO Question VALUES('cmfvwqd0k8fwfjypq4gfyfmif','Question 14 for Org 8: What is 14 + 8?',NULL,'[{"text":"22"},{"text":"23"},{"text":"21"},{"text":"24"}]',0,NULL,NULL,'General Awareness','Geography','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmwxqmiulp7imk3ujuwjrzpx2',0,'BOTH');
INSERT INTO Question VALUES('cmu5rhce1hrw0wj9x0iilal5g','Question 15 for Org 8: What is 15 + 8?',NULL,'[{"text":"23"},{"text":"24"},{"text":"22"},{"text":"25"}]',0,NULL,NULL,'English','Vocabulary','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmmrh500ix6icsp4b22j72ld4',0,'BOTH');
INSERT INTO Question VALUES('cmkbpqfrfbjn7n6m46m7ahevo','Question 16 for Org 8: What is 16 + 8?',NULL,'[{"text":"24"},{"text":"25"},{"text":"23"},{"text":"26"}]',0,NULL,NULL,'Mathematics','Profit & Loss','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmmrh500ix6icsp4b22j72ld4',0,'BOTH');
INSERT INTO Question VALUES('cm5iwy5zdwv9ubpqxsch7fu6g','Question 17 for Org 8: What is 17 + 8?',NULL,'[{"text":"25"},{"text":"26"},{"text":"24"},{"text":"27"}]',0,NULL,NULL,'English','Antonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmmrh500ix6icsp4b22j72ld4',0,'BOTH');
INSERT INTO Question VALUES('cmaqmdzzo854fajjnmfh18eyy','Question 18 for Org 8: What is 18 + 8?',NULL,'[{"text":"26"},{"text":"27"},{"text":"25"},{"text":"28"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmwxqmiulp7imk3ujuwjrzpx2',0,'BOTH');
INSERT INTO Question VALUES('cm7eoqwxf2io27eykexz3xbf0','Question 19 for Org 8: What is 19 + 8?',NULL,'[{"text":"27"},{"text":"28"},{"text":"26"},{"text":"29"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmmrh500ix6icsp4b22j72ld4',0,'BOTH');
INSERT INTO Question VALUES('cmuxmt8i6x2b7z93pg6qrbnes','Question 20 for Org 8: What is 20 + 8?',NULL,'[{"text":"28"},{"text":"29"},{"text":"27"},{"text":"30"}]',0,NULL,NULL,'Mathematics','Profit & Loss','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn','cmhq9tdv7omabawdq6arxzrlk',0,'BOTH');
INSERT INTO Question VALUES('cms98zkerx8jbu29qzollabre','Question 1 for Org 9: What is 1 + 9?',NULL,'[{"text":"10"},{"text":"11"},{"text":"9"},{"text":"12"}]',0,NULL,NULL,'Mathematics','Percentage','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cm333dnd6ir4ubitcc6u0kssx',0,'BOTH');
INSERT INTO Question VALUES('cmh7ij9am9ufb0512oto29m4k','Question 2 for Org 9: What is 2 + 9?',NULL,'[{"text":"11"},{"text":"12"},{"text":"10"},{"text":"13"}]',0,NULL,NULL,'English','Synonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmwfd2npf84m7atd967l4z4q2',0,'BOTH');
INSERT INTO Question VALUES('cmy9d5jbftrqg1dxnpmikbl5j','Question 3 for Org 9: What is 3 + 9?',NULL,'[{"text":"12"},{"text":"13"},{"text":"11"},{"text":"14"}]',0,NULL,NULL,'Mathematics','Algebra','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmwfd2npf84m7atd967l4z4q2',0,'BOTH');
INSERT INTO Question VALUES('cm4hp55cu1ujf774sfsrr6md4','Question 4 for Org 9: What is 4 + 9?',NULL,'[{"text":"13"},{"text":"14"},{"text":"12"},{"text":"15"}]',0,NULL,NULL,'Reasoning','Syllogism','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cm333dnd6ir4ubitcc6u0kssx',0,'BOTH');
INSERT INTO Question VALUES('cmw4pa7vfbk7ewuncu2ljtct7','Question 5 for Org 9: What is 5 + 9?',NULL,'[{"text":"14"},{"text":"15"},{"text":"13"},{"text":"16"}]',0,NULL,NULL,'Reasoning','Blood Relations','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmywa5c36bbxjfiirek5nrqnk',0,'BOTH');
INSERT INTO Question VALUES('cmq038ubmi1174uo29wtw47q1','Question 6 for Org 9: What is 6 + 9?',NULL,'[{"text":"15"},{"text":"16"},{"text":"14"},{"text":"17"}]',0,NULL,NULL,'General Awareness','Geography','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmwfd2npf84m7atd967l4z4q2',0,'BOTH');
INSERT INTO Question VALUES('cmnrkdflaspwrfk1wto1c23o0','Question 7 for Org 9: What is 7 + 9?',NULL,'[{"text":"16"},{"text":"17"},{"text":"15"},{"text":"18"}]',0,NULL,NULL,'Reasoning','Series','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmywa5c36bbxjfiirek5nrqnk',0,'BOTH');
INSERT INTO Question VALUES('cmj0mnfeb4suev7vl972kb6z9','Question 8 for Org 9: What is 8 + 9?',NULL,'[{"text":"17"},{"text":"18"},{"text":"16"},{"text":"19"}]',0,NULL,NULL,'Reasoning','Blood Relations','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmywa5c36bbxjfiirek5nrqnk',0,'BOTH');
INSERT INTO Question VALUES('cmxc5c7xw9t7igh8vddj9lnkc','Question 9 for Org 9: What is 9 + 9?',NULL,'[{"text":"18"},{"text":"19"},{"text":"17"},{"text":"20"}]',0,NULL,NULL,'Reasoning','Series','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmwfd2npf84m7atd967l4z4q2',0,'BOTH');
INSERT INTO Question VALUES('cm6sl0aumzg9hltjdnklacgd0','Question 10 for Org 9: What is 10 + 9?',NULL,'[{"text":"19"},{"text":"20"},{"text":"18"},{"text":"21"}]',0,NULL,NULL,'English','Comprehension','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmwfd2npf84m7atd967l4z4q2',0,'BOTH');
INSERT INTO Question VALUES('cmgl20s2snej66vsvwt2feoom','Question 11 for Org 9: What is 11 + 9?',NULL,'[{"text":"20"},{"text":"21"},{"text":"19"},{"text":"22"}]',0,NULL,NULL,'Reasoning','Series','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmywa5c36bbxjfiirek5nrqnk',0,'BOTH');
INSERT INTO Question VALUES('cmfkwmtkwc056dd42cqlh5x45','Question 12 for Org 9: What is 12 + 9?',NULL,'[{"text":"21"},{"text":"22"},{"text":"20"},{"text":"23"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cm333dnd6ir4ubitcc6u0kssx',0,'BOTH');
INSERT INTO Question VALUES('cmr5i3imn60igmbox7l51luzd','Question 13 for Org 9: What is 13 + 9?',NULL,'[{"text":"22"},{"text":"23"},{"text":"21"},{"text":"24"}]',0,NULL,NULL,'Reasoning','Analogy','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cm333dnd6ir4ubitcc6u0kssx',0,'BOTH');
INSERT INTO Question VALUES('cmavs67hukdpr8svi8d3wn6fl','Question 14 for Org 9: What is 14 + 9?',NULL,'[{"text":"23"},{"text":"24"},{"text":"22"},{"text":"25"}]',0,NULL,NULL,'Reasoning','Syllogism','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmwfd2npf84m7atd967l4z4q2',0,'BOTH');
INSERT INTO Question VALUES('cm77ddo40yukcon5sw3dnzroq','Question 15 for Org 9: What is 15 + 9?',NULL,'[{"text":"24"},{"text":"25"},{"text":"23"},{"text":"26"}]',0,NULL,NULL,'Mathematics','Time & Work','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmwfd2npf84m7atd967l4z4q2',0,'BOTH');
INSERT INTO Question VALUES('cm7t65om67ekc2ov9zwgl707e','Question 16 for Org 9: What is 16 + 9?',NULL,'[{"text":"25"},{"text":"26"},{"text":"24"},{"text":"27"}]',0,NULL,NULL,'English','Synonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmywa5c36bbxjfiirek5nrqnk',0,'BOTH');
INSERT INTO Question VALUES('cmkksr31cfkwmsv83tc8odw4o','Question 17 for Org 9: What is 17 + 9?',NULL,'[{"text":"26"},{"text":"27"},{"text":"25"},{"text":"28"}]',0,NULL,NULL,'English','Comprehension','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmwfd2npf84m7atd967l4z4q2',0,'BOTH');
INSERT INTO Question VALUES('cmw26p5g8ax3383hh41bu6u5t','Question 18 for Org 9: What is 18 + 9?',NULL,'[{"text":"27"},{"text":"28"},{"text":"26"},{"text":"29"}]',0,NULL,NULL,'Reasoning','Series','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmywa5c36bbxjfiirek5nrqnk',0,'BOTH');
INSERT INTO Question VALUES('cmcgla9rufkik85uwyy1dhv0v','Question 19 for Org 9: What is 19 + 9?',NULL,'[{"text":"28"},{"text":"29"},{"text":"27"},{"text":"30"}]',0,NULL,NULL,'General Awareness','Polity','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmywa5c36bbxjfiirek5nrqnk',0,'BOTH');
INSERT INTO Question VALUES('cmkmqsz8p8lmhf0ihmaxn5gd0','Question 20 for Org 9: What is 20 + 9?',NULL,'[{"text":"29"},{"text":"30"},{"text":"28"},{"text":"31"}]',0,NULL,NULL,'Reasoning','Coding-Decoding','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi','cmywa5c36bbxjfiirek5nrqnk',0,'BOTH');
INSERT INTO Question VALUES('cmny7jbr30vr3uvkdb757bgbp','Question 1 for Org 10: What is 1 + 10?',NULL,'[{"text":"11"},{"text":"12"},{"text":"10"},{"text":"13"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmfq9d1jzexz4qnq01kgcwnge',0,'BOTH');
INSERT INTO Question VALUES('cmtuwauek8xg0qz7n9v0fjh0s','Question 2 for Org 10: What is 2 + 10?',NULL,'[{"text":"12"},{"text":"13"},{"text":"11"},{"text":"14"}]',0,NULL,NULL,'Reasoning','Syllogism','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmbkt0urpuxu9ea54so1wcsqg',0,'BOTH');
INSERT INTO Question VALUES('cmvz2nnj4trmnnq1dbpk373q7','Question 3 for Org 10: What is 3 + 10?',NULL,'[{"text":"13"},{"text":"14"},{"text":"12"},{"text":"15"}]',0,NULL,NULL,'Reasoning','Series','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmfq9d1jzexz4qnq01kgcwnge',0,'BOTH');
INSERT INTO Question VALUES('cmec3mifz4eddfkwqiizv8mo3','Question 4 for Org 10: What is 4 + 10?',NULL,'[{"text":"14"},{"text":"15"},{"text":"13"},{"text":"16"}]',0,NULL,NULL,'Reasoning','Syllogism','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmql3zm8jmc75yvoxu2q8u6ec',0,'BOTH');
INSERT INTO Question VALUES('cmmgmjkhf3rgmgbl1g0rbuq0s','Question 5 for Org 10: What is 5 + 10?',NULL,'[{"text":"15"},{"text":"16"},{"text":"14"},{"text":"17"}]',0,NULL,NULL,'Reasoning','Coding-Decoding','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmql3zm8jmc75yvoxu2q8u6ec',0,'BOTH');
INSERT INTO Question VALUES('cmxvn6ooq1v6dk6mrgkhyawe2','Question 6 for Org 10: What is 6 + 10?',NULL,'[{"text":"16"},{"text":"17"},{"text":"15"},{"text":"18"}]',0,NULL,NULL,'English','Antonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmql3zm8jmc75yvoxu2q8u6ec',0,'BOTH');
INSERT INTO Question VALUES('cmlrpvk4lq8vyufbzd0sd5sdd','Question 7 for Org 10: What is 7 + 10?',NULL,'[{"text":"17"},{"text":"18"},{"text":"16"},{"text":"19"}]',0,NULL,NULL,'General Awareness','Geography','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmbkt0urpuxu9ea54so1wcsqg',0,'BOTH');
INSERT INTO Question VALUES('cmdwtm1f8wve3u2wu5vyxpkj8','Question 8 for Org 10: What is 8 + 10?',NULL,'[{"text":"18"},{"text":"19"},{"text":"17"},{"text":"20"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmfq9d1jzexz4qnq01kgcwnge',0,'BOTH');
INSERT INTO Question VALUES('cmlnhz7gddwro5pfntj0mtia9','Question 9 for Org 10: What is 9 + 10?',NULL,'[{"text":"19"},{"text":"20"},{"text":"18"},{"text":"21"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmbkt0urpuxu9ea54so1wcsqg',0,'BOTH');
INSERT INTO Question VALUES('cm5gx5q83mu3txlbzgs2komca','Question 10 for Org 10: What is 10 + 10?',NULL,'[{"text":"20"},{"text":"21"},{"text":"19"},{"text":"22"}]',0,NULL,NULL,'English','Synonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmql3zm8jmc75yvoxu2q8u6ec',0,'BOTH');
INSERT INTO Question VALUES('cmxxttrsc79rnu0o2v95qbab0','Question 11 for Org 10: What is 11 + 10?',NULL,'[{"text":"21"},{"text":"22"},{"text":"20"},{"text":"23"}]',0,NULL,NULL,'English','Synonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmbkt0urpuxu9ea54so1wcsqg',0,'BOTH');
INSERT INTO Question VALUES('cmcrmfle3547o3ps0zs1ts6c8','Question 12 for Org 10: What is 12 + 10?',NULL,'[{"text":"22"},{"text":"23"},{"text":"21"},{"text":"24"}]',0,NULL,NULL,'General Awareness','History','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmql3zm8jmc75yvoxu2q8u6ec',0,'BOTH');
INSERT INTO Question VALUES('cmwfsxf8bwy32sejjorh7fgc0','Question 13 for Org 10: What is 13 + 10?',NULL,'[{"text":"23"},{"text":"24"},{"text":"22"},{"text":"25"}]',0,NULL,NULL,'General Awareness','Current Affairs','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmbkt0urpuxu9ea54so1wcsqg',0,'BOTH');
INSERT INTO Question VALUES('cmm40uc6b2uozwf3iy4n3s47p','Question 14 for Org 10: What is 14 + 10?',NULL,'[{"text":"24"},{"text":"25"},{"text":"23"},{"text":"26"}]',0,NULL,NULL,'Reasoning','Series','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmql3zm8jmc75yvoxu2q8u6ec',0,'BOTH');
INSERT INTO Question VALUES('cmtlb7dqevjcvqb5v0375pl4n','Question 15 for Org 10: What is 15 + 10?',NULL,'[{"text":"25"},{"text":"26"},{"text":"24"},{"text":"27"}]',0,NULL,NULL,'Reasoning','Coding-Decoding','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmql3zm8jmc75yvoxu2q8u6ec',0,'BOTH');
INSERT INTO Question VALUES('cmxsxyel3gzmju7x165b5i87j','Question 16 for Org 10: What is 16 + 10?',NULL,'[{"text":"26"},{"text":"27"},{"text":"25"},{"text":"28"}]',0,NULL,NULL,'General Awareness','Science','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmql3zm8jmc75yvoxu2q8u6ec',0,'BOTH');
INSERT INTO Question VALUES('cmedis0wa8hz2oyoldgstqoeu','Question 17 for Org 10: What is 17 + 10?',NULL,'[{"text":"27"},{"text":"28"},{"text":"26"},{"text":"29"}]',0,NULL,NULL,'Reasoning','Blood Relations','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmql3zm8jmc75yvoxu2q8u6ec',0,'BOTH');
INSERT INTO Question VALUES('cmi67zf82rdtmvqa66vwchar9','Question 18 for Org 10: What is 18 + 10?',NULL,'[{"text":"28"},{"text":"29"},{"text":"27"},{"text":"30"}]',0,NULL,NULL,'Reasoning','Syllogism','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmbkt0urpuxu9ea54so1wcsqg',0,'BOTH');
INSERT INTO Question VALUES('cm1lfd6qk1b08t7p4jvpduckj','Question 19 for Org 10: What is 19 + 10?',NULL,'[{"text":"29"},{"text":"30"},{"text":"28"},{"text":"31"}]',0,NULL,NULL,'English','Synonyms','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmfq9d1jzexz4qnq01kgcwnge',0,'BOTH');
INSERT INTO Question VALUES('cmz0e2ol5midgsgwcz87micmg','Question 20 for Org 10: What is 20 + 10?',NULL,'[{"text":"30"},{"text":"31"},{"text":"29"},{"text":"32"}]',0,NULL,NULL,'Mathematics','Percentage','MEDIUM','SSC_CGL',NULL,NULL,NULL,NULL,NULL,0,'MCQ',NULL,0,0,'2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p','cmbkt0urpuxu9ea54so1wcsqg',0,'BOTH');
CREATE TABLE IF NOT EXISTS "Test" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "titleHi" TEXT,
    "description" TEXT NOT NULL,
    "descriptionHi" TEXT,
    "type" TEXT NOT NULL,
    "topicId" TEXT,
    "duration" INTEGER NOT NULL,
    "questionCount" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "totalMarks" REAL NOT NULL,
    "negativeMarking" REAL NOT NULL,
    "organizationId" TEXT,
    "createdById" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "scheduledAt" DATETIME,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, resultsDisclosed BOOLEAN DEFAULT 0,
    CONSTRAINT "Test_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Test_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO Test VALUES('cmly3jta40006jxt10lig8gs1','fff','','ddd','','Topic',NULL,60,1,'MEDIUM',100.0,0.25,NULL,'cmlxhoemo0014yzunx93ymhv7','DRAFT',NULL,0,1771785852411,1771785852411,0);
INSERT INTO Test VALUES('cmdn3u2clv8anz6bpj0l5g4cg','Mock Test 1 - Org 1',NULL,'Comprehensive mock test for Org 1',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cm3m3i0a5miq1emoanqywm5wu',NULL,'LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',1);
INSERT INTO Test VALUES('cmyn5dy7i47z0xepxde1bcyn0','Mock Test 2 - Org 1',NULL,'Comprehensive mock test for Org 1',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cm3m3i0a5miq1emoanqywm5wu','cm6vvq5aw81hmxoj2lh9nx901','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',1);
INSERT INTO Test VALUES('cmvul3g0wat9riz1tcnpkhauh','Mock Test 1 - Org 2',NULL,'Comprehensive mock test for Org 2',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cm5eyggsuc6d9heg61opqo1b6','cm1n5ls4xr8ivfx68tm7t25x5','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',1);
INSERT INTO Test VALUES('cmey8578moen2tk9g6pc8g2ar','Mock Test 2 - Org 2',NULL,'Comprehensive mock test for Org 2',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cm5eyggsuc6d9heg61opqo1b6','cm1n5ls4xr8ivfx68tm7t25x5','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',1);
INSERT INTO Test VALUES('cml52yl0di7ox0o5io5g8t78l','Mock Test 1 - Org 3',NULL,'Comprehensive mock test for Org 3',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cm3iw4rca22bnpi38ln2pvuu6','cmpz0r7v8zbq9k8ve60gddgot','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmobcism4afrklr6nmmb2itas','Mock Test 2 - Org 3',NULL,'Comprehensive mock test for Org 3',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cm3iw4rca22bnpi38ln2pvuu6','cmcjl2mjejbaveid21cur558z','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmhxuk84i6jt8ba07qqvdtfry','Mock Test 1 - Org 4',NULL,'Comprehensive mock test for Org 4',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmuhb7wqt9e4w76zu447edu8q','cm7eayashujgrpe9ftkxh8tnr','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmsped7b6gvpjtgl1ibhempnd','Mock Test 2 - Org 4',NULL,'Comprehensive mock test for Org 4',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmuhb7wqt9e4w76zu447edu8q','cmrzv583n0jq931u6xguchg3a','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmuftfr9quj167bafalhk6kp3','Mock Test 1 - Org 5',NULL,'Comprehensive mock test for Org 5',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmohapm51zcnf318y7wndm4f8','cmpy8d1csdjcsahvp44yfa0gw','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmkdd54g1m7koekqr5h5o5xbp','Mock Test 2 - Org 5',NULL,'Comprehensive mock test for Org 5',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmohapm51zcnf318y7wndm4f8','cmamb1fpe501vj9q7iv5dxusx','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmm3amsqktue1nieuy4dm4ix5','Mock Test 1 - Org 6',NULL,'Comprehensive mock test for Org 6',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmrc9ky8q81oqyl05rd9co30a','cm8hqazw5ffx1cyonwjf176g4','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmwhggjn17um6kihqe1b6wiyu','Mock Test 2 - Org 6',NULL,'Comprehensive mock test for Org 6',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmrc9ky8q81oqyl05rd9co30a','cmthf6kfsldjmuzhvks4pzcod','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmrkxbbgf4wicp4tn6w4hu4ap','Mock Test 1 - Org 7',NULL,'Comprehensive mock test for Org 7',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmcpuo3xtr6u1imvvfwm5adz9','cmrfwiavjw2xwuc67xdtsqn4t','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmzrrf5awz9d60j56p6acqt2u','Mock Test 2 - Org 7',NULL,'Comprehensive mock test for Org 7',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmcpuo3xtr6u1imvvfwm5adz9','cmxoyp6ql16t74gs5ntmibby1','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmd8y5jxganyg4wm3vm615zv1','Mock Test 1 - Org 8',NULL,'Comprehensive mock test for Org 8',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmeoopjwa0tuorfsbcnmzd0sn','cmhq9tdv7omabawdq6arxzrlk','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmkz1naugm2s085pfyhtsu8d6','Mock Test 2 - Org 8',NULL,'Comprehensive mock test for Org 8',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmeoopjwa0tuorfsbcnmzd0sn','cmwxqmiulp7imk3ujuwjrzpx2','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmb8gnh78rnwhfrjj476p2888','Mock Test 1 - Org 9',NULL,'Comprehensive mock test for Org 9',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmvrnrejeleylqwfz73md6bmi','cm333dnd6ir4ubitcc6u0kssx','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmzk01vsn1q79sfz0xao51h4s','Mock Test 2 - Org 9',NULL,'Comprehensive mock test for Org 9',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmvrnrejeleylqwfz73md6bmi','cmywa5c36bbxjfiirek5nrqnk','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cmgful7qvsr9wpf7kh84ey5y3','Mock Test 1 - Org 10',NULL,'Comprehensive mock test for Org 10',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmxi886z0xd3rll6qdtxwwi5p','cmbkt0urpuxu9ea54so1wcsqg','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',0);
INSERT INTO Test VALUES('cm0stqnft8aokwq5gi5cn017u','Mock Test 2 - Org 10',NULL,'Comprehensive mock test for Org 10',NULL,'Full',NULL,30,10,'MEDIUM',20.0,0.5,'cmxi886z0xd3rll6qdtxwwi5p','cmfq9d1jzexz4qnq01kgcwnge','LIVE',NULL,0,'2026-02-22 18:51:06','2026-02-22 18:51:06',1);
INSERT INTO Test VALUES('cmly42jwj0008jxt1755ojvdf','zdvfcbv','','zcxvbb','','Topic',NULL,60,0,'MEDIUM',100.0,0.25,'cm3m3i0a5miq1emoanqywm5wu','cmlxhoemp0016yzunlhujp5b1','DRAFT',NULL,0,1771786726719,1771786726719,1);
CREATE TABLE IF NOT EXISTS "QuestionOccurrence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "examName" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "shift" TEXT,
    "questionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QuestionOccurrence_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO QuestionOccurrence VALUES('PYQ_2023_T1_01_primary','SSC CGL Tier 1',2023,'Shift 1','PYQ_2023_T1_01','2026-02-22 16:36:46');
INSERT INTO QuestionOccurrence VALUES('PYQ_2022_T1_05_primary','SSC CGL Tier 1',2022,'Shift 2','PYQ_2022_T1_05','2026-02-22 16:36:46');
INSERT INTO QuestionOccurrence VALUES('PYQ_2023_T2_02_primary','SSC CGL Tier 2',2023,'Mains','PYQ_2023_T2_02','2026-02-22 16:36:46');
INSERT INTO QuestionOccurrence VALUES('PYQ_2022_T1_12_primary','SSC CGL Tier 1',2022,'Shift 3','PYQ_2022_T1_12','2026-02-22 16:36:46');
INSERT INTO QuestionOccurrence VALUES('PYQ_2023_T1_08_primary','SSC CGL Tier 1',2023,'Shift 1','PYQ_2023_T1_08','2026-02-22 16:36:46');
INSERT INTO QuestionOccurrence VALUES('PYQ_2022_T2_03_primary','SSC CGL Tier 2',2022,'Mains','PYQ_2022_T2_03','2026-02-22 16:36:46');
INSERT INTO QuestionOccurrence VALUES('PYQ_2023_T1_15_primary','SSC CGL Tier 1',2023,'Shift 2','PYQ_2023_T1_15','2026-02-22 16:36:46');
INSERT INTO QuestionOccurrence VALUES('PYQ_2022_T1_18_primary','SSC CGL Tier 1',2022,'Shift 1','PYQ_2022_T1_18','2026-02-22 16:36:46');
INSERT INTO QuestionOccurrence VALUES('PYQ_2023_T2_05_primary','SSC CGL Tier 2',2023,'Mains','PYQ_2023_T2_05','2026-02-22 16:36:46');
INSERT INTO QuestionOccurrence VALUES('PYQ_2022_T1_22_primary','SSC CGL Tier 1',2022,'Shift 1','PYQ_2022_T1_22','2026-02-22 16:36:46');
INSERT INTO QuestionOccurrence VALUES('PYQ_2023_T1_20_primary','SSC CGL Tier 1',2023,'Shift 3','PYQ_2023_T1_20','2026-02-22 16:36:46');
CREATE TABLE IF NOT EXISTS "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'IMAGE',
    "width" INTEGER,
    "height" INTEGER,
    "caption" TEXT,
    "questionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Media_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "UserProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "isSolved" BOOLEAN NOT NULL DEFAULT false,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "isBookmarked" BOOLEAN NOT NULL DEFAULT false,
    "attemptedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeTaken" INTEGER,
    CONSTRAINT "UserProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserProgress_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "UserTestAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "accuracy" REAL NOT NULL,
    "rank" INTEGER,
    "answersJson" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    "organizationId" TEXT,
    CONSTRAINT "UserTestAttempt_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserTestAttempt_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UserTestAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO UserTestAttempt VALUES('cmnfzsv0c19bi68y503c6ejxf','cm2dimnxvylue5ndl6gs4dfoz','cmdn3u2clv8anz6bpj0l5g4cg',17.98738949416084764,89.93694747080424179,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu');
INSERT INTO UserTestAttempt VALUES('cmivyyst5e57620uebk2zejmc','cm2dimnxvylue5ndl6gs4dfoz','cmyn5dy7i47z0xepxde1bcyn0',14.03952483049823741,70.19762415249118703,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu');
INSERT INTO UserTestAttempt VALUES('cm1obvgysiq1maq5gk3dp9mdi','cmmdl78hhhve3hsfnhbu88ktk','cmyn5dy7i47z0xepxde1bcyn0',18.46631816930532465,92.3315908465266232,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cm3m3i0a5miq1emoanqywm5wu');
INSERT INTO UserTestAttempt VALUES('cmrvcggkumlb55ztqvmxia89t','cm70sq4o6rtgh6xjy58kxz3kt','cmvul3g0wat9riz1tcnpkhauh',11.9047083496352304,59.52354174817615729,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6');
INSERT INTO UserTestAttempt VALUES('cmk52atfr47pr4z2gqy83uos5','cm70sq4o6rtgh6xjy58kxz3kt','cmey8578moen2tk9g6pc8g2ar',14.08987485475420164,70.44937427377099936,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cm5eyggsuc6d9heg61opqo1b6');
INSERT INTO UserTestAttempt VALUES('cmvdefqdoq38w5efi88qyri58','cmsl38xyn7buepyikscuhcc1d','cml52yl0di7ox0o5io5g8t78l',13.39799130920864201,66.98995654604320294,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6');
INSERT INTO UserTestAttempt VALUES('cmm388zxhzb3rnhx8om205qrw','cm5crt2kznhsyjm3hcxzryiln','cmobcism4afrklr6nmmb2itas',12.00089279444534895,60.00446397222673766,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6');
INSERT INTO UserTestAttempt VALUES('cms0ogispyohg48poj09exisn','cmsl38xyn7buepyikscuhcc1d','cmobcism4afrklr6nmmb2itas',12.7501975243526573,63.75098762176328649,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cm3iw4rca22bnpi38ln2pvuu6');
INSERT INTO UserTestAttempt VALUES('cm5fjc375m5lkevtx651rhs08','cmy1ojefbr75quj55www0bn9q','cmhxuk84i6jt8ba07qqvdtfry',15.73944845053477692,78.69724225267388817,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q');
INSERT INTO UserTestAttempt VALUES('cm744frr2sko9f8dy7m0evfa0','cmy1ojefbr75quj55www0bn9q','cmsped7b6gvpjtgl1ibhempnd',13.86614482150534045,69.33072410752669156,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q');
INSERT INTO UserTestAttempt VALUES('cm9cj2bkgl8v0ypw1uf7wm6zv','cmwfrau3kns8m03qf3r1m1itf','cmsped7b6gvpjtgl1ibhempnd',5.528764716227306585,27.64382358113653381,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmuhb7wqt9e4w76zu447edu8q');
INSERT INTO UserTestAttempt VALUES('cm5uwin745xbd8igscgv0o7cn','cmkmnddxuwz1d1ji6tn5zvv7m','cmkdd54g1m7koekqr5h5o5xbp',15.81001114127936091,79.05005570639680457,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8');
INSERT INTO UserTestAttempt VALUES('cm8vdoi0ufn7oe1zxgc8sd6rf','cm1x6xbbnfqy4qeaf4jhks75m','cmkdd54g1m7koekqr5h5o5xbp',14.94603112981634752,74.73015564908173757,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmohapm51zcnf318y7wndm4f8');
INSERT INTO UserTestAttempt VALUES('cm5dilw57j14v344de6141f9d','cmaqfjlcbl8vbf839mb464ryl','cmwhggjn17um6kihqe1b6wiyu',7.192254228015101169,35.96127114007551028,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmrc9ky8q81oqyl05rd9co30a');
INSERT INTO UserTestAttempt VALUES('cmb7zrpnv0eegdkmjmrl9dsiv','cmop1i300e527y5e2t2lyppdf','cmrkxbbgf4wicp4tn6w4hu4ap',17.44347241925763114,87.21736209628815572,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9');
INSERT INTO UserTestAttempt VALUES('cmf3wwwoelod575be32dfnjm0','cm9ij2rczme1igpq2r48f63li','cmzrrf5awz9d60j56p6acqt2u',17.92057385159453986,89.6028692579726993,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmcpuo3xtr6u1imvvfwm5adz9');
INSERT INTO UserTestAttempt VALUES('cmq2y7pj12byj5n02gsnijv87','cm4bl5z35cq7ychkebuv86hk8','cmkz1naugm2s085pfyhtsu8d6',18.42099603887136893,92.10498019435684113,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn');
INSERT INTO UserTestAttempt VALUES('cm0mmrju8h747qa0csym1qlqn','cm4bewzs243z42zxmx29swi53','cmkz1naugm2s085pfyhtsu8d6',11.29453469249999919,56.47267346249999775,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmeoopjwa0tuorfsbcnmzd0sn');
INSERT INTO UserTestAttempt VALUES('cm6yxmxjml3d15dm6ozrm6n7t','cmr9c1mulknnfrkoqbppk93m1','cmb8gnh78rnwhfrjj476p2888',13.59189547988278691,67.95947739941394162,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi');
INSERT INTO UserTestAttempt VALUES('cmdnr2qqyq37osalqdks6zbqs','cmm052e222qfcnnflc0plr5mx','cmb8gnh78rnwhfrjj476p2888',5.909439676288373633,29.54719838144186994,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi');
INSERT INTO UserTestAttempt VALUES('cmshv0bnzh93m71pdp80i7iet','cmr9c1mulknnfrkoqbppk93m1','cmzk01vsn1q79sfz0xao51h4s',14.24095844751378514,71.20479223756892395,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmvrnrejeleylqwfz73md6bmi');
INSERT INTO UserTestAttempt VALUES('cm8rvd8ywplzo1twtwz4qv031','cm4tt0h1k2dyguec45lcyjl3o','cm0stqnft8aokwq5gi5cn017u',9.52773211122780773,47.63866055613903683,NULL,'{}','SUBMITTED','2026-02-22 18:51:06','2026-02-22 18:51:06','2026-02-22 18:51:06','cmxi886z0xd3rll6qdtxwwi5p');
INSERT INTO UserTestAttempt VALUES('cmly4xwt7000ajxt1sozg6t9j','cm5crt2kznhsyjm3hcxzryiln','cml52yl0di7ox0o5io5g8t78l',2.5,30.0,NULL,'{"cmzv8vvetpvkujxnvtvs7neup":0,"cmzv2umpnq3b5tx85yblixhq3":3,"cmztb4gf7490ogekrtmxrb16i":2,"cmzi1dfad5o6zhdetyo4bd1zk":1,"cmz7lz3gcx1y08vf0o87glvx0":0,"cmz0e2ol5midgsgwcz87micmg":2,"cmyadu9hb2zusj51pdurk6nf3":3,"cmy9d5jbftrqg1dxnpmikbl5j":0,"cmy8yqlds4bd30o5ffjr2d2gs":2,"cmxxttrsc79rnu0o2v95qbab0":1}','SUBMITTED',1771788189785,1771788189785,1771788189784,'cm3iw4rca22bnpi38ln2pvuu6');
INSERT INTO UserTestAttempt VALUES('cmly56f9z000cjxt1xofgowu7','cm5crt2kznhsyjm3hcxzryiln','cml52yl0di7ox0o5io5g8t78l',0.0,0.0,NULL,'{}','SUBMITTED',1771788586964,1771788586964,1771788586963,'cm3iw4rca22bnpi38ln2pvuu6');
INSERT INTO UserTestAttempt VALUES('cmly57a24000ejxt1t1zdv25n','cm5crt2kznhsyjm3hcxzryiln','cml52yl0di7ox0o5io5g8t78l',2.0,100.0,NULL,'{"cmzv8vvetpvkujxnvtvs7neup":0}','SUBMITTED',1771788626861,1771788626861,1771788626860,'cm3iw4rca22bnpi38ln2pvuu6');
INSERT INTO UserTestAttempt VALUES('cmly5u56o000gjxt13zcmzye2','cm5crt2kznhsyjm3hcxzryiln','cml52yl0di7ox0o5io5g8t78l',0.0,0.0,NULL,'{}','SUBMITTED',1771789693630,1771789693630,1771789693628,'cm3iw4rca22bnpi38ln2pvuu6');
INSERT INTO UserTestAttempt VALUES('cmly5w6ro000ijxt14e2b45wc','cm5crt2kznhsyjm3hcxzryiln','cmobcism4afrklr6nmmb2itas',0.0,0.0,NULL,'{}','SUBMITTED',1771789788997,1771789788997,1771789788990,'cm3iw4rca22bnpi38ln2pvuu6');
CREATE TABLE IF NOT EXISTS "TestAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "testId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "organizationId" TEXT,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TestAssignment_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TestAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO TestAssignment VALUES('cmi4j50iykurkpkc94peoylkn','cmdn3u2clv8anz6bpj0l5g4cg','cm2dimnxvylue5ndl6gs4dfoz','cm3m3i0a5miq1emoanqywm5wu','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm7a18b1s1v7qbvwm0ztc3qbq','cmdn3u2clv8anz6bpj0l5g4cg','cmmdl78hhhve3hsfnhbu88ktk','cm3m3i0a5miq1emoanqywm5wu','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm70xtnajd4401nl8z6qr4ekp','cmyn5dy7i47z0xepxde1bcyn0','cm2dimnxvylue5ndl6gs4dfoz','cm3m3i0a5miq1emoanqywm5wu','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm6ejxvyl1qs2m2czx8ggdqis','cmyn5dy7i47z0xepxde1bcyn0','cmmdl78hhhve3hsfnhbu88ktk','cm3m3i0a5miq1emoanqywm5wu','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmqghtwxo09pb4vejlp4ncrci','cmvul3g0wat9riz1tcnpkhauh','cm70sq4o6rtgh6xjy58kxz3kt','cm5eyggsuc6d9heg61opqo1b6','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmj4ortbz66gbv5g3dkz5ogyu','cmvul3g0wat9riz1tcnpkhauh','cm82r4w2ny7cf4kui646kg0na','cm5eyggsuc6d9heg61opqo1b6','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmwg4q25eij2b14xtxkjh0iw3','cmey8578moen2tk9g6pc8g2ar','cm70sq4o6rtgh6xjy58kxz3kt','cm5eyggsuc6d9heg61opqo1b6','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm8u2msx53stosmajjsqiipah','cmey8578moen2tk9g6pc8g2ar','cm82r4w2ny7cf4kui646kg0na','cm5eyggsuc6d9heg61opqo1b6','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmcdac759rijtx5y2v4m9uyd9','cml52yl0di7ox0o5io5g8t78l','cm5crt2kznhsyjm3hcxzryiln','cm3iw4rca22bnpi38ln2pvuu6','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmn14qppq0784dnlqbg0jzbea','cml52yl0di7ox0o5io5g8t78l','cmsl38xyn7buepyikscuhcc1d','cm3iw4rca22bnpi38ln2pvuu6','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm1vh2v3l1z6ldzd2l3xw1d42','cmobcism4afrklr6nmmb2itas','cm5crt2kznhsyjm3hcxzryiln','cm3iw4rca22bnpi38ln2pvuu6','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm8hgew7is0y4eawmgulo5tut','cmobcism4afrklr6nmmb2itas','cmsl38xyn7buepyikscuhcc1d','cm3iw4rca22bnpi38ln2pvuu6','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmaxlkz8y0e0zj979ksvurvat','cmhxuk84i6jt8ba07qqvdtfry','cmy1ojefbr75quj55www0bn9q','cmuhb7wqt9e4w76zu447edu8q','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmsoli1ham8dqr9huzuan3tbt','cmhxuk84i6jt8ba07qqvdtfry','cmwfrau3kns8m03qf3r1m1itf','cmuhb7wqt9e4w76zu447edu8q','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm8qanf0p64ha9444xfrowe56','cmsped7b6gvpjtgl1ibhempnd','cmy1ojefbr75quj55www0bn9q','cmuhb7wqt9e4w76zu447edu8q','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmz6hed2f4p0yf89q8xzeurjk','cmsped7b6gvpjtgl1ibhempnd','cmwfrau3kns8m03qf3r1m1itf','cmuhb7wqt9e4w76zu447edu8q','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm4ptwxqos4s0vfb1gbetx0uj','cmuftfr9quj167bafalhk6kp3','cmkmnddxuwz1d1ji6tn5zvv7m','cmohapm51zcnf318y7wndm4f8','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmmmem0pgl5k2o9ajbw4cjhys','cmuftfr9quj167bafalhk6kp3','cm1x6xbbnfqy4qeaf4jhks75m','cmohapm51zcnf318y7wndm4f8','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm2iodzqgoah9jv6nlthrhlib','cmkdd54g1m7koekqr5h5o5xbp','cmkmnddxuwz1d1ji6tn5zvv7m','cmohapm51zcnf318y7wndm4f8','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmw54t81c1blsynfbbx1whu03','cmkdd54g1m7koekqr5h5o5xbp','cm1x6xbbnfqy4qeaf4jhks75m','cmohapm51zcnf318y7wndm4f8','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmuwvwhjqbeac45qmxtk90a68','cmm3amsqktue1nieuy4dm4ix5','cmaqfjlcbl8vbf839mb464ryl','cmrc9ky8q81oqyl05rd9co30a','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm9096dll4aoa1cb0cc70o2qy','cmm3amsqktue1nieuy4dm4ix5','cmklgobl28s67t74eruyix476','cmrc9ky8q81oqyl05rd9co30a','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmyoqppss6ids35klqfc84anf','cmwhggjn17um6kihqe1b6wiyu','cmaqfjlcbl8vbf839mb464ryl','cmrc9ky8q81oqyl05rd9co30a','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm559ellkqv4d4upcq2hktlrq','cmwhggjn17um6kihqe1b6wiyu','cmklgobl28s67t74eruyix476','cmrc9ky8q81oqyl05rd9co30a','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cme00ihdo6tc4subtl96tu10j','cmrkxbbgf4wicp4tn6w4hu4ap','cmop1i300e527y5e2t2lyppdf','cmcpuo3xtr6u1imvvfwm5adz9','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm8lzcntbbacvly9h1z3jrk4p','cmrkxbbgf4wicp4tn6w4hu4ap','cm9ij2rczme1igpq2r48f63li','cmcpuo3xtr6u1imvvfwm5adz9','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmphr8e5y3lmh1edlx6gi8qyn','cmzrrf5awz9d60j56p6acqt2u','cmop1i300e527y5e2t2lyppdf','cmcpuo3xtr6u1imvvfwm5adz9','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm81fsas9w27ij4hk410m133z','cmzrrf5awz9d60j56p6acqt2u','cm9ij2rczme1igpq2r48f63li','cmcpuo3xtr6u1imvvfwm5adz9','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmjh7583px3k1zrdxloqrmw6g','cmd8y5jxganyg4wm3vm615zv1','cm4bl5z35cq7ychkebuv86hk8','cmeoopjwa0tuorfsbcnmzd0sn','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmmii51ygs6s1i8pkcp6szo3d','cmd8y5jxganyg4wm3vm615zv1','cm4bewzs243z42zxmx29swi53','cmeoopjwa0tuorfsbcnmzd0sn','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm2o6fffo12sdylwfk92xli53','cmkz1naugm2s085pfyhtsu8d6','cm4bl5z35cq7ychkebuv86hk8','cmeoopjwa0tuorfsbcnmzd0sn','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm3sdtjhbu41v2ltitkcpivcu','cmkz1naugm2s085pfyhtsu8d6','cm4bewzs243z42zxmx29swi53','cmeoopjwa0tuorfsbcnmzd0sn','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmrs9ijgjj6p1ni4gm9la7qnc','cmb8gnh78rnwhfrjj476p2888','cmr9c1mulknnfrkoqbppk93m1','cmvrnrejeleylqwfz73md6bmi','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmqt85yik9mnjoihqas1mar81','cmb8gnh78rnwhfrjj476p2888','cmm052e222qfcnnflc0plr5mx','cmvrnrejeleylqwfz73md6bmi','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cm9w32l5gckuu8z49c96unr1o','cmzk01vsn1q79sfz0xao51h4s','cmr9c1mulknnfrkoqbppk93m1','cmvrnrejeleylqwfz73md6bmi','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmpyehcmea59crj6qo8sh50is','cmzk01vsn1q79sfz0xao51h4s','cmm052e222qfcnnflc0plr5mx','cmvrnrejeleylqwfz73md6bmi','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmznkeqx5tk07nywg7d941y3t','cmgful7qvsr9wpf7kh84ey5y3','cm4tt0h1k2dyguec45lcyjl3o','cmxi886z0xd3rll6qdtxwwi5p','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmvbtxlm5jk6cysu4hpp2zbef','cmgful7qvsr9wpf7kh84ey5y3','cm10oh566uhyknik98452oqlr','cmxi886z0xd3rll6qdtxwwi5p','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmh684192mnm8r61xbryon1oq','cm0stqnft8aokwq5gi5cn017u','cm4tt0h1k2dyguec45lcyjl3o','cmxi886z0xd3rll6qdtxwwi5p','2026-02-22 18:51:06');
INSERT INTO TestAssignment VALUES('cmitmql5gandx7ae0fmabpam5','cm0stqnft8aokwq5gi5cn017u','cm10oh566uhyknik98452oqlr','cmxi886z0xd3rll6qdtxwwi5p','2026-02-22 18:51:06');
CREATE TABLE IF NOT EXISTS "_TestQuestions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TestQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TestQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "Test" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO _TestQuestions VALUES('cmly2z8n10003jxt1u5fne3g5','cmly3jta40006jxt10lig8gs1');
INSERT INTO _TestQuestions VALUES('cmdn3u2clv8anz6bpj0l5g4cg','cm8zjbdysrtw1h4dj0xzbrcmf');
INSERT INTO _TestQuestions VALUES('cmdn3u2clv8anz6bpj0l5g4cg','cmt821wrq5qm2ddag13f43ebs');
INSERT INTO _TestQuestions VALUES('cmdn3u2clv8anz6bpj0l5g4cg','cmeygbhp934wslfhzamcoydxp');
INSERT INTO _TestQuestions VALUES('cmdn3u2clv8anz6bpj0l5g4cg','cmv4mwictpnwgu8lsier14njv');
INSERT INTO _TestQuestions VALUES('cmdn3u2clv8anz6bpj0l5g4cg','cmfjg774tuled70capr12rzq1');
INSERT INTO _TestQuestions VALUES('cmdn3u2clv8anz6bpj0l5g4cg','cmgy11s69aity9gilzn9yi5yv');
INSERT INTO _TestQuestions VALUES('cmdn3u2clv8anz6bpj0l5g4cg','cmet4ad8fo7v529cx0nwf93wb');
INSERT INTO _TestQuestions VALUES('cmdn3u2clv8anz6bpj0l5g4cg','cmxutq6qmsorx8ooh9fbjgs9o');
INSERT INTO _TestQuestions VALUES('cmdn3u2clv8anz6bpj0l5g4cg','cmfm4b9gkewyixco8695otwdh');
INSERT INTO _TestQuestions VALUES('cmdn3u2clv8anz6bpj0l5g4cg','cmlnv3ogv3bqs60kd4xfrohgj');
INSERT INTO _TestQuestions VALUES('cmyn5dy7i47z0xepxde1bcyn0','cmuryjbqokrdfgfxbnpm4a6kq');
INSERT INTO _TestQuestions VALUES('cmyn5dy7i47z0xepxde1bcyn0','cmr4hcz0w3s2u03e594wiyaqk');
INSERT INTO _TestQuestions VALUES('cmyn5dy7i47z0xepxde1bcyn0','cmhmxpe564pest3mtf4lfn42a');
INSERT INTO _TestQuestions VALUES('cmyn5dy7i47z0xepxde1bcyn0','cmfm4b9gkewyixco8695otwdh');
INSERT INTO _TestQuestions VALUES('cmyn5dy7i47z0xepxde1bcyn0','cmzv8vvetpvkujxnvtvs7neup');
INSERT INTO _TestQuestions VALUES('cmyn5dy7i47z0xepxde1bcyn0','cmgy11s69aity9gilzn9yi5yv');
INSERT INTO _TestQuestions VALUES('cmyn5dy7i47z0xepxde1bcyn0','cmika4y1yowpzuodtygi0gb0a');
INSERT INTO _TestQuestions VALUES('cmyn5dy7i47z0xepxde1bcyn0','cmxutq6qmsorx8ooh9fbjgs9o');
INSERT INTO _TestQuestions VALUES('cmyn5dy7i47z0xepxde1bcyn0','cmigdsu70la2d7yt62a3q61zt');
INSERT INTO _TestQuestions VALUES('cmyn5dy7i47z0xepxde1bcyn0','cmv1veczyby6ia2hg7dikel69');
INSERT INTO _TestQuestions VALUES('cmvul3g0wat9riz1tcnpkhauh','cmq488isi0zdygmgl1ttjtl2h');
INSERT INTO _TestQuestions VALUES('cmvul3g0wat9riz1tcnpkhauh','cmsyvegqn5kzr61gp9qlmq03a');
INSERT INTO _TestQuestions VALUES('cmvul3g0wat9riz1tcnpkhauh','cme3tb5c3tz8shsp1kd4k37z0');
INSERT INTO _TestQuestions VALUES('cmvul3g0wat9riz1tcnpkhauh','cmrrj03z9dovzwkw7elbjhdi2');
INSERT INTO _TestQuestions VALUES('cmvul3g0wat9riz1tcnpkhauh','cmx5d190s76rs5rhaaupd6kgn');
INSERT INTO _TestQuestions VALUES('cmvul3g0wat9riz1tcnpkhauh','cmn2g13e9zjevnfp199menah0');
INSERT INTO _TestQuestions VALUES('cmvul3g0wat9riz1tcnpkhauh','cmdxv81oioas7473vb5fyge6d');
INSERT INTO _TestQuestions VALUES('cmvul3g0wat9riz1tcnpkhauh','cmvkx75plt7qts3jjbmfw3y9h');
INSERT INTO _TestQuestions VALUES('cmvul3g0wat9riz1tcnpkhauh','cmk8fkj5g862cmezfjtow19rx');
INSERT INTO _TestQuestions VALUES('cmvul3g0wat9riz1tcnpkhauh','cm0ihi1g96ea2m72i0ii4khw9');
INSERT INTO _TestQuestions VALUES('cmey8578moen2tk9g6pc8g2ar','cmq488isi0zdygmgl1ttjtl2h');
INSERT INTO _TestQuestions VALUES('cmey8578moen2tk9g6pc8g2ar','cms7th3kev82go7lwy0lqip1e');
INSERT INTO _TestQuestions VALUES('cmey8578moen2tk9g6pc8g2ar','cmdxv81oioas7473vb5fyge6d');
INSERT INTO _TestQuestions VALUES('cmey8578moen2tk9g6pc8g2ar','cm39cll9wmzsx8ua5czod80ap');
INSERT INTO _TestQuestions VALUES('cmey8578moen2tk9g6pc8g2ar','cmayeagv3khgwhgcc6kwapfa8');
INSERT INTO _TestQuestions VALUES('cmey8578moen2tk9g6pc8g2ar','cmrrj03z9dovzwkw7elbjhdi2');
INSERT INTO _TestQuestions VALUES('cmey8578moen2tk9g6pc8g2ar','cmn2g13e9zjevnfp199menah0');
INSERT INTO _TestQuestions VALUES('cmey8578moen2tk9g6pc8g2ar','cmeyfadzlxfqku92x34ulth7f');
INSERT INTO _TestQuestions VALUES('cmey8578moen2tk9g6pc8g2ar','cmhmphkh59ir8cpoo6dz30elz');
INSERT INTO _TestQuestions VALUES('cmey8578moen2tk9g6pc8g2ar','cmsyvegqn5kzr61gp9qlmq03a');
INSERT INTO _TestQuestions VALUES('cml52yl0di7ox0o5io5g8t78l','cmron0eu1tay2d87hs65qqwmd');
INSERT INTO _TestQuestions VALUES('cml52yl0di7ox0o5io5g8t78l','cmhqn29h3wpn84sxma6crtyc4');
INSERT INTO _TestQuestions VALUES('cml52yl0di7ox0o5io5g8t78l','cm1nj64vu6774q2pv9x4wcq7c');
INSERT INTO _TestQuestions VALUES('cml52yl0di7ox0o5io5g8t78l','cmv0nr5ufpo3hxez09w5mtfnn');
INSERT INTO _TestQuestions VALUES('cml52yl0di7ox0o5io5g8t78l','cmf5qqgfxeexvvbm9g6612qeb');
INSERT INTO _TestQuestions VALUES('cml52yl0di7ox0o5io5g8t78l','cm8ipt5zfuu5xu84x37s606tb');
INSERT INTO _TestQuestions VALUES('cml52yl0di7ox0o5io5g8t78l','cmcno4ev3ctufzi1l8atc1ohk');
INSERT INTO _TestQuestions VALUES('cml52yl0di7ox0o5io5g8t78l','cm8cj7k4keeg6vzukxj7mhjt2');
INSERT INTO _TestQuestions VALUES('cml52yl0di7ox0o5io5g8t78l','cmnpc17lsrsmoiic8119ti1ij');
INSERT INTO _TestQuestions VALUES('cml52yl0di7ox0o5io5g8t78l','cmy8yqlds4bd30o5ffjr2d2gs');
INSERT INTO _TestQuestions VALUES('cmobcism4afrklr6nmmb2itas','cmegkhnfsa925sv6ws13qjn4j');
INSERT INTO _TestQuestions VALUES('cmobcism4afrklr6nmmb2itas','cmcno4ev3ctufzi1l8atc1ohk');
INSERT INTO _TestQuestions VALUES('cmobcism4afrklr6nmmb2itas','cmhqn29h3wpn84sxma6crtyc4');
INSERT INTO _TestQuestions VALUES('cmobcism4afrklr6nmmb2itas','cmv0nr5ufpo3hxez09w5mtfnn');
INSERT INTO _TestQuestions VALUES('cmobcism4afrklr6nmmb2itas','cm0k9wiz88q52z58gsrxg9hmj');
INSERT INTO _TestQuestions VALUES('cmobcism4afrklr6nmmb2itas','cm2u2p36qvsfg0cs1xlqf48q4');
INSERT INTO _TestQuestions VALUES('cmobcism4afrklr6nmmb2itas','cmtu47dbb9k59avrpd5d70yi4');
INSERT INTO _TestQuestions VALUES('cmobcism4afrklr6nmmb2itas','cmf5qqgfxeexvvbm9g6612qeb');
INSERT INTO _TestQuestions VALUES('cmobcism4afrklr6nmmb2itas','cmron0eu1tay2d87hs65qqwmd');
INSERT INTO _TestQuestions VALUES('cmobcism4afrklr6nmmb2itas','cm0boe5rehxq1ca4pa01oucdo');
INSERT INTO _TestQuestions VALUES('cmhxuk84i6jt8ba07qqvdtfry','cm4lsrdgz69veqhykraap34ka');
INSERT INTO _TestQuestions VALUES('cmhxuk84i6jt8ba07qqvdtfry','cm0a6bh67x16qm57k8rclpbyw');
INSERT INTO _TestQuestions VALUES('cmhxuk84i6jt8ba07qqvdtfry','cmjsnhf8zxdsmuczqdyawe1ew');
INSERT INTO _TestQuestions VALUES('cmhxuk84i6jt8ba07qqvdtfry','cmqbwfcupslxw1zvv82ryvq7v');
INSERT INTO _TestQuestions VALUES('cmhxuk84i6jt8ba07qqvdtfry','cmeqcokr5o16che1mucv6apjf');
INSERT INTO _TestQuestions VALUES('cmhxuk84i6jt8ba07qqvdtfry','cm5xizzddyujid1znnssihvry');
INSERT INTO _TestQuestions VALUES('cmhxuk84i6jt8ba07qqvdtfry','cm5p5nydapr4avlm3nuy3d6s3');
INSERT INTO _TestQuestions VALUES('cmhxuk84i6jt8ba07qqvdtfry','cmdg0egbi2vfwy4qov98jovqz');
INSERT INTO _TestQuestions VALUES('cmhxuk84i6jt8ba07qqvdtfry','cmnrd0leh2ih5o7hxbdm9a4up');
INSERT INTO _TestQuestions VALUES('cmhxuk84i6jt8ba07qqvdtfry','cmn2nym7j13ou6kh085yehetz');
INSERT INTO _TestQuestions VALUES('cmsped7b6gvpjtgl1ibhempnd','cmn2nym7j13ou6kh085yehetz');
INSERT INTO _TestQuestions VALUES('cmsped7b6gvpjtgl1ibhempnd','cm5p5nydapr4avlm3nuy3d6s3');
INSERT INTO _TestQuestions VALUES('cmsped7b6gvpjtgl1ibhempnd','cmeqcokr5o16che1mucv6apjf');
INSERT INTO _TestQuestions VALUES('cmsped7b6gvpjtgl1ibhempnd','cm3qzkof40sxyh9z7q4xlqtzp');
INSERT INTO _TestQuestions VALUES('cmsped7b6gvpjtgl1ibhempnd','cmnrd0leh2ih5o7hxbdm9a4up');
INSERT INTO _TestQuestions VALUES('cmsped7b6gvpjtgl1ibhempnd','cm5xizzddyujid1znnssihvry');
INSERT INTO _TestQuestions VALUES('cmsped7b6gvpjtgl1ibhempnd','cmdg0egbi2vfwy4qov98jovqz');
INSERT INTO _TestQuestions VALUES('cmsped7b6gvpjtgl1ibhempnd','cmckchh2pyo2nevuu940i9qj8');
INSERT INTO _TestQuestions VALUES('cmsped7b6gvpjtgl1ibhempnd','cmdo3bl5i44v387zxuj6svkxd');
INSERT INTO _TestQuestions VALUES('cmsped7b6gvpjtgl1ibhempnd','cm51zj1n7uplyj5hb08gs7y3n');
INSERT INTO _TestQuestions VALUES('cmuftfr9quj167bafalhk6kp3','cmq5go9wj2611fjb55yq2r2nw');
INSERT INTO _TestQuestions VALUES('cmuftfr9quj167bafalhk6kp3','cmuxqxsbwwytsj8czuvp1jywp');
INSERT INTO _TestQuestions VALUES('cmuftfr9quj167bafalhk6kp3','cmr0ecacugzwolfo7h0nzog1c');
INSERT INTO _TestQuestions VALUES('cmuftfr9quj167bafalhk6kp3','cmkf6tkhxvqtv34w9rbkgzmqn');
INSERT INTO _TestQuestions VALUES('cmuftfr9quj167bafalhk6kp3','cmt8vawmymgbh4amxay7ccik8');
INSERT INTO _TestQuestions VALUES('cmuftfr9quj167bafalhk6kp3','cmpv1343kls6l0mg6f3ux6p7u');
INSERT INTO _TestQuestions VALUES('cmuftfr9quj167bafalhk6kp3','cmmee035l0lkagu7ttqj4mf75');
INSERT INTO _TestQuestions VALUES('cmuftfr9quj167bafalhk6kp3','cmojpqz8mwxqpu1nagcusgkui');
INSERT INTO _TestQuestions VALUES('cmuftfr9quj167bafalhk6kp3','cm2r1z2tndwmzo64q68ri5yih');
INSERT INTO _TestQuestions VALUES('cmuftfr9quj167bafalhk6kp3','cmebcg6cv1ua0e3dp18nyin7w');
INSERT INTO _TestQuestions VALUES('cmkdd54g1m7koekqr5h5o5xbp','cm4kbdn2q4kpw22wqdns839pk');
INSERT INTO _TestQuestions VALUES('cmkdd54g1m7koekqr5h5o5xbp','cmmee035l0lkagu7ttqj4mf75');
INSERT INTO _TestQuestions VALUES('cmkdd54g1m7koekqr5h5o5xbp','cmk553p7q8gsask4otxgkycif');
INSERT INTO _TestQuestions VALUES('cmkdd54g1m7koekqr5h5o5xbp','cm92pjgr3cw4dna714um7yvuz');
INSERT INTO _TestQuestions VALUES('cmkdd54g1m7koekqr5h5o5xbp','cm805xoqrn6jg03tei3zdkng7');
INSERT INTO _TestQuestions VALUES('cmkdd54g1m7koekqr5h5o5xbp','cmt8vawmymgbh4amxay7ccik8');
INSERT INTO _TestQuestions VALUES('cmkdd54g1m7koekqr5h5o5xbp','cmbht6o7gj5tyyfrgihd4d0wc');
INSERT INTO _TestQuestions VALUES('cmkdd54g1m7koekqr5h5o5xbp','cmk7xmeo3mvnl6fibvs7et7bt');
INSERT INTO _TestQuestions VALUES('cmkdd54g1m7koekqr5h5o5xbp','cmbdg0nbjilam7ebh7t4f4fhk');
INSERT INTO _TestQuestions VALUES('cmkdd54g1m7koekqr5h5o5xbp','cmpv1343kls6l0mg6f3ux6p7u');
INSERT INTO _TestQuestions VALUES('cmm3amsqktue1nieuy4dm4ix5','cmg0bylaa921rcoy1utiqgu3y');
INSERT INTO _TestQuestions VALUES('cmm3amsqktue1nieuy4dm4ix5','cmkul2ij1jvf9kgsyvpw2t69k');
INSERT INTO _TestQuestions VALUES('cmm3amsqktue1nieuy4dm4ix5','cmyadu9hb2zusj51pdurk6nf3');
INSERT INTO _TestQuestions VALUES('cmm3amsqktue1nieuy4dm4ix5','cm4udjg427dbpc4yxi3ix2auf');
INSERT INTO _TestQuestions VALUES('cmm3amsqktue1nieuy4dm4ix5','cmwvnitc1qk4t2qslhxqdzj3p');
INSERT INTO _TestQuestions VALUES('cmm3amsqktue1nieuy4dm4ix5','cmzv2umpnq3b5tx85yblixhq3');
INSERT INTO _TestQuestions VALUES('cmm3amsqktue1nieuy4dm4ix5','cmz7lz3gcx1y08vf0o87glvx0');
INSERT INTO _TestQuestions VALUES('cmm3amsqktue1nieuy4dm4ix5','cmn3zcalacye1ltcxi1kxodun');
INSERT INTO _TestQuestions VALUES('cmm3amsqktue1nieuy4dm4ix5','cmni0z7zvpiak2s7g5jhx5phb');
INSERT INTO _TestQuestions VALUES('cmm3amsqktue1nieuy4dm4ix5','cmu5kzvu48kl4xcxxp73mh3h2');
INSERT INTO _TestQuestions VALUES('cmwhggjn17um6kihqe1b6wiyu','cmz7lz3gcx1y08vf0o87glvx0');
INSERT INTO _TestQuestions VALUES('cmwhggjn17um6kihqe1b6wiyu','cmn3zcalacye1ltcxi1kxodun');
INSERT INTO _TestQuestions VALUES('cmwhggjn17um6kihqe1b6wiyu','cm7ebrq9h9jjta84s2z4rygm9');
INSERT INTO _TestQuestions VALUES('cmwhggjn17um6kihqe1b6wiyu','cmhdkl0g02aaiq1u46wbou59z');
INSERT INTO _TestQuestions VALUES('cmwhggjn17um6kihqe1b6wiyu','cmtee70h436n4kz1zbojnef6r');
INSERT INTO _TestQuestions VALUES('cmwhggjn17um6kihqe1b6wiyu','cmg0bylaa921rcoy1utiqgu3y');
INSERT INTO _TestQuestions VALUES('cmwhggjn17um6kihqe1b6wiyu','cmd3ew20e24vvbv6diemlo43g');
INSERT INTO _TestQuestions VALUES('cmwhggjn17um6kihqe1b6wiyu','cmi1ae0qz61q3efisg8fba08f');
INSERT INTO _TestQuestions VALUES('cmwhggjn17um6kihqe1b6wiyu','cmzv2umpnq3b5tx85yblixhq3');
INSERT INTO _TestQuestions VALUES('cmwhggjn17um6kihqe1b6wiyu','cmi5d5c905ul41cerq510ep3q');
INSERT INTO _TestQuestions VALUES('cmrkxbbgf4wicp4tn6w4hu4ap','cmpe6e6iq739dmnily7f5qjvb');
INSERT INTO _TestQuestions VALUES('cmrkxbbgf4wicp4tn6w4hu4ap','cmmvcsg9mihzs4k9bdlhu9aku');
INSERT INTO _TestQuestions VALUES('cmrkxbbgf4wicp4tn6w4hu4ap','cmtwx58lwr4dwspj4puaf8jpn');
INSERT INTO _TestQuestions VALUES('cmrkxbbgf4wicp4tn6w4hu4ap','cm0jp1gvnetrz4oa5r1gp09d6');
INSERT INTO _TestQuestions VALUES('cmrkxbbgf4wicp4tn6w4hu4ap','cme1a0w29ywr2bfzsddb9lfng');
INSERT INTO _TestQuestions VALUES('cmrkxbbgf4wicp4tn6w4hu4ap','cm35y2lob55ph0wdixxgn0p09');
INSERT INTO _TestQuestions VALUES('cmrkxbbgf4wicp4tn6w4hu4ap','cmoodezwbhbn7l2usj32krgc2');
INSERT INTO _TestQuestions VALUES('cmrkxbbgf4wicp4tn6w4hu4ap','cm8q7p30ur3vophievozlskb4');
INSERT INTO _TestQuestions VALUES('cmrkxbbgf4wicp4tn6w4hu4ap','cmeutko8pi4yofz7771nb4ron');
INSERT INTO _TestQuestions VALUES('cmrkxbbgf4wicp4tn6w4hu4ap','cmw03do3pp3us2pyv1974mwpy');
INSERT INTO _TestQuestions VALUES('cmzrrf5awz9d60j56p6acqt2u','cm8q7p30ur3vophievozlskb4');
INSERT INTO _TestQuestions VALUES('cmzrrf5awz9d60j56p6acqt2u','cmtwx58lwr4dwspj4puaf8jpn');
INSERT INTO _TestQuestions VALUES('cmzrrf5awz9d60j56p6acqt2u','cmtvib5zj0xjjzkgumreivte3');
INSERT INTO _TestQuestions VALUES('cmzrrf5awz9d60j56p6acqt2u','cm429p8c8rwzxja97rcqhlmce');
INSERT INTO _TestQuestions VALUES('cmzrrf5awz9d60j56p6acqt2u','cmxpnvcozfcsu67cg2qlcgex2');
INSERT INTO _TestQuestions VALUES('cmzrrf5awz9d60j56p6acqt2u','cmeutko8pi4yofz7771nb4ron');
INSERT INTO _TestQuestions VALUES('cmzrrf5awz9d60j56p6acqt2u','cm4uk1gmv56te5guz3znrgli1');
INSERT INTO _TestQuestions VALUES('cmzrrf5awz9d60j56p6acqt2u','cm35y2lob55ph0wdixxgn0p09');
INSERT INTO _TestQuestions VALUES('cmzrrf5awz9d60j56p6acqt2u','cm1vunwshye8lpvfwfuw4gzda');
INSERT INTO _TestQuestions VALUES('cmzrrf5awz9d60j56p6acqt2u','cmmvcsg9mihzs4k9bdlhu9aku');
INSERT INTO _TestQuestions VALUES('cmd8y5jxganyg4wm3vm615zv1','cm5bt3vem0zpdfrlv15uso2sk');
INSERT INTO _TestQuestions VALUES('cmd8y5jxganyg4wm3vm615zv1','cmgn7o07v1iskttxx0v4lyc6f');
INSERT INTO _TestQuestions VALUES('cmd8y5jxganyg4wm3vm615zv1','cmwumjgbbg2e9avobsmgmjygv');
INSERT INTO _TestQuestions VALUES('cmd8y5jxganyg4wm3vm615zv1','cmfvwqd0k8fwfjypq4gfyfmif');
INSERT INTO _TestQuestions VALUES('cmd8y5jxganyg4wm3vm615zv1','cmu5rhce1hrw0wj9x0iilal5g');
INSERT INTO _TestQuestions VALUES('cmd8y5jxganyg4wm3vm615zv1','cmb7jd3do5g2igl0h547axiuo');
INSERT INTO _TestQuestions VALUES('cmd8y5jxganyg4wm3vm615zv1','cml4v3aev22pdohaz0r04ie90');
INSERT INTO _TestQuestions VALUES('cmd8y5jxganyg4wm3vm615zv1','cmuxmt8i6x2b7z93pg6qrbnes');
INSERT INTO _TestQuestions VALUES('cmd8y5jxganyg4wm3vm615zv1','cmqsdmxg6dsgxx47wopixmb88');
INSERT INTO _TestQuestions VALUES('cmd8y5jxganyg4wm3vm615zv1','cm8lfxgbrk2eb5tppcntjy1ba');
INSERT INTO _TestQuestions VALUES('cmkz1naugm2s085pfyhtsu8d6','cmgn7o07v1iskttxx0v4lyc6f');
INSERT INTO _TestQuestions VALUES('cmkz1naugm2s085pfyhtsu8d6','cm5bt3vem0zpdfrlv15uso2sk');
INSERT INTO _TestQuestions VALUES('cmkz1naugm2s085pfyhtsu8d6','cmaqmdzzo854fajjnmfh18eyy');
INSERT INTO _TestQuestions VALUES('cmkz1naugm2s085pfyhtsu8d6','cmfvwqd0k8fwfjypq4gfyfmif');
INSERT INTO _TestQuestions VALUES('cmkz1naugm2s085pfyhtsu8d6','cmm1ppvkroq20ssvlj7xvkw00');
INSERT INTO _TestQuestions VALUES('cmkz1naugm2s085pfyhtsu8d6','cmkbpqfrfbjn7n6m46m7ahevo');
INSERT INTO _TestQuestions VALUES('cmkz1naugm2s085pfyhtsu8d6','cmu5rhce1hrw0wj9x0iilal5g');
INSERT INTO _TestQuestions VALUES('cmkz1naugm2s085pfyhtsu8d6','cmqsdmxg6dsgxx47wopixmb88');
INSERT INTO _TestQuestions VALUES('cmkz1naugm2s085pfyhtsu8d6','cmvbj7oesgfem1gpys84lyqmp');
INSERT INTO _TestQuestions VALUES('cmkz1naugm2s085pfyhtsu8d6','cm7eoqwxf2io27eykexz3xbf0');
INSERT INTO _TestQuestions VALUES('cmb8gnh78rnwhfrjj476p2888','cmcgla9rufkik85uwyy1dhv0v');
INSERT INTO _TestQuestions VALUES('cmb8gnh78rnwhfrjj476p2888','cmy9d5jbftrqg1dxnpmikbl5j');
INSERT INTO _TestQuestions VALUES('cmb8gnh78rnwhfrjj476p2888','cmkmqsz8p8lmhf0ihmaxn5gd0');
INSERT INTO _TestQuestions VALUES('cmb8gnh78rnwhfrjj476p2888','cmgl20s2snej66vsvwt2feoom');
INSERT INTO _TestQuestions VALUES('cmb8gnh78rnwhfrjj476p2888','cmj0mnfeb4suev7vl972kb6z9');
INSERT INTO _TestQuestions VALUES('cmb8gnh78rnwhfrjj476p2888','cmq038ubmi1174uo29wtw47q1');
INSERT INTO _TestQuestions VALUES('cmb8gnh78rnwhfrjj476p2888','cmavs67hukdpr8svi8d3wn6fl');
INSERT INTO _TestQuestions VALUES('cmb8gnh78rnwhfrjj476p2888','cmxc5c7xw9t7igh8vddj9lnkc');
INSERT INTO _TestQuestions VALUES('cmb8gnh78rnwhfrjj476p2888','cmkksr31cfkwmsv83tc8odw4o');
INSERT INTO _TestQuestions VALUES('cmb8gnh78rnwhfrjj476p2888','cmnrkdflaspwrfk1wto1c23o0');
INSERT INTO _TestQuestions VALUES('cmzk01vsn1q79sfz0xao51h4s','cms98zkerx8jbu29qzollabre');
INSERT INTO _TestQuestions VALUES('cmzk01vsn1q79sfz0xao51h4s','cmfkwmtkwc056dd42cqlh5x45');
INSERT INTO _TestQuestions VALUES('cmzk01vsn1q79sfz0xao51h4s','cmr5i3imn60igmbox7l51luzd');
INSERT INTO _TestQuestions VALUES('cmzk01vsn1q79sfz0xao51h4s','cm6sl0aumzg9hltjdnklacgd0');
INSERT INTO _TestQuestions VALUES('cmzk01vsn1q79sfz0xao51h4s','cmxc5c7xw9t7igh8vddj9lnkc');
INSERT INTO _TestQuestions VALUES('cmzk01vsn1q79sfz0xao51h4s','cmkmqsz8p8lmhf0ihmaxn5gd0');
INSERT INTO _TestQuestions VALUES('cmzk01vsn1q79sfz0xao51h4s','cm7t65om67ekc2ov9zwgl707e');
INSERT INTO _TestQuestions VALUES('cmzk01vsn1q79sfz0xao51h4s','cmw4pa7vfbk7ewuncu2ljtct7');
INSERT INTO _TestQuestions VALUES('cmzk01vsn1q79sfz0xao51h4s','cmw26p5g8ax3383hh41bu6u5t');
INSERT INTO _TestQuestions VALUES('cmzk01vsn1q79sfz0xao51h4s','cmnrkdflaspwrfk1wto1c23o0');
INSERT INTO _TestQuestions VALUES('cmgful7qvsr9wpf7kh84ey5y3','cmvz2nnj4trmnnq1dbpk373q7');
INSERT INTO _TestQuestions VALUES('cmgful7qvsr9wpf7kh84ey5y3','cmcrmfle3547o3ps0zs1ts6c8');
INSERT INTO _TestQuestions VALUES('cmgful7qvsr9wpf7kh84ey5y3','cmedis0wa8hz2oyoldgstqoeu');
INSERT INTO _TestQuestions VALUES('cmgful7qvsr9wpf7kh84ey5y3','cm1lfd6qk1b08t7p4jvpduckj');
INSERT INTO _TestQuestions VALUES('cmgful7qvsr9wpf7kh84ey5y3','cmny7jbr30vr3uvkdb757bgbp');
INSERT INTO _TestQuestions VALUES('cmgful7qvsr9wpf7kh84ey5y3','cmlrpvk4lq8vyufbzd0sd5sdd');
INSERT INTO _TestQuestions VALUES('cmgful7qvsr9wpf7kh84ey5y3','cmtlb7dqevjcvqb5v0375pl4n');
INSERT INTO _TestQuestions VALUES('cmgful7qvsr9wpf7kh84ey5y3','cmm40uc6b2uozwf3iy4n3s47p');
INSERT INTO _TestQuestions VALUES('cmgful7qvsr9wpf7kh84ey5y3','cmxxttrsc79rnu0o2v95qbab0');
INSERT INTO _TestQuestions VALUES('cmgful7qvsr9wpf7kh84ey5y3','cmxsxyel3gzmju7x165b5i87j');
INSERT INTO _TestQuestions VALUES('cm0stqnft8aokwq5gi5cn017u','cmmgmjkhf3rgmgbl1g0rbuq0s');
INSERT INTO _TestQuestions VALUES('cm0stqnft8aokwq5gi5cn017u','cmz0e2ol5midgsgwcz87micmg');
INSERT INTO _TestQuestions VALUES('cm0stqnft8aokwq5gi5cn017u','cmec3mifz4eddfkwqiizv8mo3');
INSERT INTO _TestQuestions VALUES('cm0stqnft8aokwq5gi5cn017u','cmdwtm1f8wve3u2wu5vyxpkj8');
INSERT INTO _TestQuestions VALUES('cm0stqnft8aokwq5gi5cn017u','cmxsxyel3gzmju7x165b5i87j');
INSERT INTO _TestQuestions VALUES('cm0stqnft8aokwq5gi5cn017u','cmtlb7dqevjcvqb5v0375pl4n');
INSERT INTO _TestQuestions VALUES('cm0stqnft8aokwq5gi5cn017u','cmlnhz7gddwro5pfntj0mtia9');
INSERT INTO _TestQuestions VALUES('cm0stqnft8aokwq5gi5cn017u','cmxvn6ooq1v6dk6mrgkhyawe2');
INSERT INTO _TestQuestions VALUES('cm0stqnft8aokwq5gi5cn017u','cmcrmfle3547o3ps0zs1ts6c8');
INSERT INTO _TestQuestions VALUES('cm0stqnft8aokwq5gi5cn017u','cm5gx5q83mu3txlbzgs2komca');
CREATE TABLE PasswordResetToken (id TEXT PRIMARY KEY, email TEXT, token TEXT UNIQUE, expires DATETIME, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE VerificationToken (id TEXT PRIMARY KEY, email TEXT, token TEXT UNIQUE, expires DATETIME, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE Account (id TEXT PRIMARY KEY, userId TEXT, type TEXT, provider TEXT, providerAccountId TEXT, refresh_token TEXT, access_token TEXT, expires_at INTEGER, token_type TEXT, scope TEXT, id_token TEXT, session_state TEXT, FOREIGN KEY(userId) REFERENCES User(id) ON DELETE CASCADE);
CREATE TABLE Session (id TEXT PRIMARY KEY, sessionToken TEXT UNIQUE, userId TEXT, expires DATETIME, FOREIGN KEY(userId) REFERENCES User(id) ON DELETE CASCADE);
CREATE TABLE Notification (
    id TEXT NOT NULL PRIMARY KEY,
    userId TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'INFO',
    isRead INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT Notification_userId_fkey FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Organization_contactEmail_key" ON "Organization"("contactEmail");
CREATE INDEX "Badge_userId_idx" ON "Badge"("userId");
CREATE INDEX "Question_difficulty_idx" ON "Question"("difficulty");
CREATE INDEX "Question_solveAttemptCount_idx" ON "Question"("solveAttemptCount");
CREATE INDEX "UserProgress_userId_isBookmarked_idx" ON "UserProgress"("userId", "isBookmarked");
CREATE INDEX "UserProgress_userId_isSolved_idx" ON "UserProgress"("userId", "isSolved");
CREATE UNIQUE INDEX "UserProgress_userId_questionId_key" ON "UserProgress"("userId", "questionId");
CREATE INDEX "TestAssignment_studentId_idx" ON "TestAssignment"("studentId");
CREATE INDEX "TestAssignment_organizationId_idx" ON "TestAssignment"("organizationId");
CREATE UNIQUE INDEX "TestAssignment_testId_studentId_key" ON "TestAssignment"("testId", "studentId");
CREATE UNIQUE INDEX "_TestQuestions_AB_unique" ON "_TestQuestions"("A", "B");
CREATE INDEX "_TestQuestions_B_index" ON "_TestQuestions"("B");
CREATE UNIQUE INDEX PasswordResetToken_email_token_key ON PasswordResetToken(email, token);
CREATE UNIQUE INDEX VerificationToken_email_token_key ON VerificationToken(email, token);
CREATE UNIQUE INDEX Account_provider_providerAccountId_key ON Account(provider, providerAccountId);
CREATE INDEX Notification_userId_idx ON Notification(userId);
COMMIT;
