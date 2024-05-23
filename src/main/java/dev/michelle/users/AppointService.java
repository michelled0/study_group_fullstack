package dev.michelle.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class AppointService {
    @Autowired
    private AppointRepository appointRepository;

    @Autowired
    private MongoTemplate mongoTemplate;
    public Appointment createAppointment(String firstLast, String date, String group, String description) {
        Appointment appointment = appointRepository.insert(new Appointment(firstLast, date, group, description));

        mongoTemplate.update(User.class)
        .matching(Criteria.where("firstLast").is(firstLast))
        .apply(new Update().push("appointments").value(appointment))
        .first();

        return appointment;
    }
}
