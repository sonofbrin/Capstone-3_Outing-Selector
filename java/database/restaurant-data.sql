BEGIN TRANSACTION;

INSERT INTO restaurant ("name", address, city, 
						"state", zip, phone_number, 
						web_page, img_url, open_time,
						close_time)
VALUES ('Sara''s Cafe & Grill', '3012 N Main St', 
		'Roswell', 'NM', '88201', '5756223344', 
		'https://www.yelp.com/biz/sara-s-cafe-and-grill-roswell?adjust_creative=Va-ERjPkMae0owhgfW_V-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Va-ERjPkMae0owhgfW_V-Q', 
		'https://s3-media4.fl.yelpcdn.com/bphoto/byaoyfvkQPaSYji0q_3zaw/o.jpg', 
		'11:00', '20:00');
		
INSERT INTO restaurant ("name", address, city, 
						"state", zip, phone_number, 
						web_page, img_url, open_time,
						close_time)
VALUES ('Peppers Grill & Bar', '500 N Main', 
		'Roswell', 'NM', '88201', '5756231700', 
		'https://www.yelp.com/biz/peppers-grill-and-bar-roswell?adjust_creative=Va-ERjPkMae0owhgfW_V-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Va-ERjPkMae0owhgfW_V-Q', 
		'https://s3-media3.fl.yelpcdn.com/bphoto/LH2XV4dXjRE5ttLZVohOZA/o.jpg', 
		'11:00', '21:00');
		
INSERT INTO restaurant ("name", address, city, 
						"state", zip, phone_number, 
						web_page, img_url, open_time,
						close_time)
VALUES ('Cowboy Cafe', '1120 E 2nd St', 
		'Roswell', 'NM', '88203', '5756226363', 
		'https://www.yelp.com/biz/cowboy-cafe-roswell?adjust_creative=Va-ERjPkMae0owhgfW_V-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Va-ERjPkMae0owhgfW_V-Q', 
		'https://s3-media4.fl.yelpcdn.com/bphoto/swVmWKaxzwlnSaZSJlRQRA/o.jpg', 
		'06:00', '14:00');
		
INSERT INTO restaurant ("name", address, city, 
						"state", zip, phone_number, 
						web_page, img_url, open_time,
						close_time)
VALUES ('Pecos Flavors Winery + Bistro', '412 W 2nd St', 
		'Roswell', 'NM', '88201', '5756276265', 
		'https://www.yelp.com/biz/pecos-flavors-winery-bistro-roswell?adjust_creative=Va-ERjPkMae0owhgfW_V-Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Va-ERjPkMae0owhgfW_V-Q', 
		'https://s3-media2.fl.yelpcdn.com/bphoto/c_LkGz2oMN7S0Yjt_Xt76g/o.jpg', 
		'11:00', '21:00');

INSERT INTO tag ("name") VALUES ('Breakfast');
INSERT INTO tag ("name") VALUES ('Lunch');
INSERT INTO tag ("name") VALUES ('Dinner');
INSERT INTO tag ("name") VALUES ('Barbecue');
INSERT INTO tag ("name") VALUES ('Mexican');
INSERT INTO tag ("name") VALUES ('Mediterranean');
INSERT INTO tag ("name") VALUES ('Chinese');
INSERT INTO tag ("name") VALUES ('Ethiopian');
INSERT INTO tag ("name") VALUES ('Korean');
INSERT INTO tag ("name") VALUES ('Bar');
INSERT INTO tag ("name") VALUES ('Patio');
INSERT INTO tag ("name") VALUES ('Delivery');

INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Sara''s Cafe & Grill'),
	   (SELECT id FROM tag WHERE "name" = 'Mediterranean'));
	   
INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Sara''s Cafe & Grill'),
	   (SELECT id FROM tag WHERE "name" = 'Lunch'));

INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Sara''s Cafe & Grill'),
	   (SELECT id FROM tag WHERE "name" = 'Dinner'));
	   
INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Peppers Grill & Bar'),
	   (SELECT id FROM tag WHERE "name" = 'Lunch'));
	   
INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Peppers Grill & Bar'),
	   (SELECT id FROM tag WHERE "name" = 'Dinner'));
	   
INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Peppers Grill & Bar'),
	   (SELECT id FROM tag WHERE "name" = 'Mexican'));

INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Peppers Grill & Bar'),
	   (SELECT id FROM tag WHERE "name" = 'Bar'));
	   
INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Peppers Grill & Bar'),
	   (SELECT id FROM tag WHERE "name" = 'Patio'));

INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Peppers Grill & Bar'),
	   (SELECT id FROM tag WHERE "name" = 'Delivery'));
	   
INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Cowboy Cafe'),
	   (SELECT id FROM tag WHERE "name" = 'Breakfast'));
	   
INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Cowboy Cafe'),
	   (SELECT id FROM tag WHERE "name" = 'Lunch'));
	   
INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Cowboy Cafe'),
	   (SELECT id FROM tag WHERE "name" = 'Delivery'));
	   
INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Pecos Flavors Winery + Bistro'),
	   (SELECT id FROM tag WHERE "name" = 'Lunch'));
	   
INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Pecos Flavors Winery + Bistro'),
	   (SELECT id FROM tag WHERE "name" = 'Dinner'));

INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Pecos Flavors Winery + Bistro'),
	   (SELECT id FROM tag WHERE "name" = 'Bar'));
	   
INSERT INTO restaurant_tag (restaurant_id, tag_id)
VALUES ((SELECT id FROM restaurant WHERE "name" = 'Pecos Flavors Winery + Bistro'),
	   (SELECT id FROM tag WHERE "name" = 'Patio'));

COMMIT;
