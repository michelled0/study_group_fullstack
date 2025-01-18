package dev.michelle.users;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public Optional<User> singleUser(String firstLast) {
        return userRepository.findUserByFirstLast(firstLast);
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    public User createUser(String firstName, String lastName, String firstLast) {
        User user = userRepository.save(new User(firstLast, firstName, lastName));

        return user;
    }
}
