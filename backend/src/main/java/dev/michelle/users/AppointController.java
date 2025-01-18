package dev.michelle.users;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/appointments")
public class AppointController {
    @Autowired
    private AppointService appointService;

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<Appointment>(appointService.createAppointment(payload.get("firstLast"), payload.get("date"), payload.get("group"), payload.get("description")), HttpStatus.CREATED);
    }
}
